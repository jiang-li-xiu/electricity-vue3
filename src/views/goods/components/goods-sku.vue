<!--
 * @Descripttion: 规格组件
 * @Author: JLX
 * @Date: 2022-08-09 11:13:00
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-09 14:25:03
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
            :class="{ selected: val.selected }"
            :src="val.picture"
            :title="val.name"
          />
          <span
            v-else
            @click="changeSku(item, val)"
            :class="{ selected: val.selected }"
            >{{ val.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: "GoodsSku",
  props: {
    goods: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    // 1. 选中与取消选中，约定在每一个按钮都拥有自己的选中状态数据：selected
    // 1.1 点击的是已选中，只需要取消发当前的选中
    // 1.2 点击的是未选中，把同一个规格的按钮都取消选中，再将当前点击的改为已选中
    const changeSku = (item, val) => {
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
