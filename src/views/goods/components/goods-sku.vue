<!--
 * @Descripttion: 规格组件
 * @Author: JLX
 * @Date: 2022-08-09 11:13:00
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-17 08:38:06
-->
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            v-if="val.picture"
            @click="changeSku(item, val)"
            :class="{ selected: val.selected, disabled: val.disabled }"
            :src="val.picture"
            :title="val.name"
          />
          <span
            v-else
            @click="changeSku(item, val)"
            :class="{ selected: val.selected, disabled: val.disabled }"
            >{{ val.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from "@/vebder/power-set";
const spliter = "★";
// **得到一个路径字典对象
const getPathMap = (skus) => {
  // 1. 得到所有的sku集合  props.goods.skus中
  // 2. 从所有的sku中筛选出有效的sku
  // 3. 根据有效的sku使用power-set算法得到子集
  // 4. 根据子集 往路径字典对象中存储 key-value
  const pathMap = {};
  skus.forEach((sku) => {
    // inventory库存
    if (sku.inventory) {
      // 计算当前有库存的sku子集
      // 例如： [1,2,3] ==> [[1],[2],[3],[1,2],[1,3],[2,3],[1,3]]
      // 拿到可选值数组
      const valueArr = sku.specs.map((val) => val.valueName);
      // console.log(valueArr);
      // 可选值数组子集
      const valArrPowerSet = powerSet(valueArr);
      // console.log(valArrPowerSet);
      // 遍历子集，往pathMap插入数据
      valArrPowerSet.forEach((arr) => {
        // 根据arr得到字符串的key 约定key是：['蓝色','美国'] ===> '蓝色★美国'
        const key = arr.join(spliter);
        // console.log(key);
        // 往pathMap设置数据
        if (pathMap[key]) {
          // 已经有值
          pathMap[key].push(sku.id);
        } else {
          pathMap[key] = [sku.id];
        }
      });
    }
  });
  return pathMap;
};

// **记录选中的按钮对象
const getSelectedValues = (specs) => {
  const arr = [];
  specs.forEach((item) => {
    // 拿到选中的按钮对象
    const selectedVal = item.values.find((val) => val.selected);
    // 如果有值 添加到arr，否则添加undefined
    arr.push(selectedVal ? selectedVal.name : undefined);
  });
  return arr;
};

// 更新按钮禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  // 1. 约定每一个按钮的状态 由本身的disabled数据来控制
  specs.forEach((item, index) => {
    // 拿到记录选中的按钮对象值 ['黑色','36','undefined']
    const selectedValues = getSelectedValues(specs);
    // 按钮对象
    item.values.forEach((val) => {
      // 2. 判断当前是否选中， 是选中不用判断
      if (val.selected) return;
      // 3. 如果不是选中，拿当前的值 按照下标套入选中的值数组
      selectedValues[index] = val.name;
      // 4. 剔除undefined数据，按照分隔符拼接key
      const key = selectedValues.filter((value) => value).join(spliter);
      // 5. 拿key 路径字典查找是否有数据，有可以点击，没有就禁用（true）
      val.disabled = !pathMap[key];
    });
  });
};

// 默认选中
const initDefaultSelected = (goods, skuId) => {
  // 1. 找出sku的信息
  // 2. 遍历每一个按钮 按钮的值和传入的sku记录的值相同，就选中
  const sku = goods.skus.find((sku) => sku.id == skuId);
  console.log(sku);
  goods.specs.forEach((item, i) => {
    console.log(item);
    const val = item.values.find((val) => val.name === sku.specs[i].valueName);
    // 选中它
    val.selected = true;
  });
};

export default {
  name: "GoodsSku",
  props: {
    goods: {
      type: Object,
      default: () => ({}),
    },
    skuId: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const getPath = getPathMap(props.goods.skus);
    // console.log(getPath);
    // 根据skuId初始化选中
    if (props.skuId) {
      initDefaultSelected(props.goods, props.skuId);
    }
    // ★ 组件初始化，更新按钮的状态
    updateDisabledStatus(props.goods.specs, getPath);

    // 1. 选中与取消选中，约定在每一个按钮都拥有自己的选中状态数据：selected
    // 1.1 点击的是已选中，只需要取消发当前的选中
    // 1.2 点击的是未选中，把同一个规格的按钮都取消选中，再将当前点击的改为已选中
    const changeSku = (item, val) => {
      // 当按钮时禁用的 阻止程序运行
      if (val.disabled) return;
      // 如果不是禁用 正常运行
      // 如果是已选中的
      if (val.selected) {
        val.selected = false;
      } else {
        // 同一个规格的按钮都改成未选中
        item.values.forEach((valItem) => {
          valItem.selected = false;
        });
        val.selected = true;
      }
      // ★点击按钮时，更新按钮禁用状态
      // console.log(getSelectedValues(props.goods.specs)); //测试一下按钮对象的值
      updateDisabledStatus(props.goods.specs, getPath);

      // 将已选择的sku信息通知父组件 {skuId,price,oldPrice,inventory,specsText}
      // 1. 选择完整的sku组合按钮，才可以拿到这些信息，提交父组件
      // 2. 不是完整的sku组合按钮，提交空对象父组件
      const validSelectedValues = getSelectedValues(props.goods.specs).filter(
        (v) => v
      ); //过滤掉undefined
      // 选择完整 长度相等
      if (validSelectedValues.length === props.goods.specs.length) {
        const skuIds = getPath[validSelectedValues.join(spliter)];
        // console.log(skuIds);
        const sku = props.goods.skus.find((sku) => sku.id === skuIds[0]);
        emit("change", {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          //颜色:黑色 规格:36.. （字符串拼在一起）
          specsText: sku.specs.reduce(
            (p, c) => `${p} ${c.name}：${c.valueName}`,
            ""
          ),
        });
      } else {
        // 传空到时候用来判断是否规格完整，不完整不能加购物车
        emit("change", {});
      }
    };
    return {
      changeSku,
    };
  },
};
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  // 选中
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
