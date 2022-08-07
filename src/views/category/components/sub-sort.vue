<!--
 * @Descripttion: 排序组件
 * @Author: JLX
 * @Date: 2022-08-03 14:30:53
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-04 17:11:19
-->
<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        :class="{ active: sortParams.sortField == null }"
        @click="changeSort(null)"
        href="javascript:;"
        >默认排序
      </a>
      <a
        href="javascript:;"
        @click="changeSort('publishTime')"
        :class="{ active: sortParams.sortField == 'publishTime' }"
        >最新商品</a
      >
      <a
        href="javascript:;"
        @click="changeSort('orderNum')"
        :class="{ active: sortParams.sortField == 'orderNum' }"
        >最高人气</a
      >
      <a
        href="javascript:;"
        @click="changeSort('evaluateNum')"
        :class="{ active: sortParams.sortField == 'evaluateNum' }"
        >评论最多</a
      >
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i
          class="arrow up"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'asc',
          }"
        />
        <i
          class="arrow down"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod == 'desc',
          }"
        />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox @change="changeCheck" v-model="sortParams.inventory"
        >仅显示有货商品</XtxCheckbox
      >
      <XtxCheckbox @change="changeCheck" v-model="sortParams.onlyDiscount"
        >仅显示特惠商品</XtxCheckbox
      >
    </div>
  </div>
</template>
<script>
import { reactive } from "vue-demi";
export default {
  name: "SubSort",
  setup(props, { emit }) {
    // 实现交互(所需数据和后台保持一致)
    // 1.明确交互数据
    const sortParams = reactive({
      inventory: false, //是否显示有货商品
      onlyDiscount: false, //是否显示特惠商品
      sortField: null, //排序 publishTime orderNum evaluateNum price
      sortMethod: null, //排序方式 asc正序 desc倒序 默认desc
    });

    // 2. 提交给模板使用
    // 3. 需要通过绑定按钮点击事件 来修改排序字段和排序方式
    const changeSort = (sortField) => {
      // 有箭头价格排序
      if (sortField === "price") {
        sortParams.sortField = sortField;
        // 处理排序
        // 代表第一次点击排序
        if (sortParams.sortMethod === null) {
          sortParams.sortMethod = "desc";
        } else {
          // 取反
          sortParams.sortMethod =
            sortParams.sortMethod === "desc" ? "asc" : "desc";
        }
      } else {
        // 如果已经选中了，阻止运行
        if (sortParams.sortField === sortField) return;
        sortParams.sortField = sortField;
        sortParams.sortMethod = null;
      }
      // 触发 sort-change 事件, 通知sub组件
      emit("sort-change", sortParams);
    };

    // 改变了复选框，触发事件
    const changeCheck = () => {
      // 触发 sort-change 事件
      emit("sort-change", sortParams);
    };

    return {
      sortParams,
      changeSort,
      changeCheck
    };
  },
};
</script>
<style scoped lang="less">
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
