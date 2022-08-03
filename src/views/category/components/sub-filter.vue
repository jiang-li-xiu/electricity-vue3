<!--
 * @Descripttion: 筛选区
 * @Author: JLX
 * @Date: 2022-08-02 15:04:35
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-02 16:02:47
-->
<template>
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <!-- 默认选中全部 点击将id变为当前选中id -->
        <a
          @click="filterData.brands.selectedBrand = item.id"
          :class="{ active: item.id === filterData.brands.selectedBrand }"
          href="javascript:;"
          v-for="item in filterData.brands"
          :key="item.id"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
    <!--  -->
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a
          @click="item.selectedProp = prop.id"
          :class="{ active: prop.id === item.selectedProp }"
          href="javascript:;"
          v-for="prop in item.properties"
          :key="prop.id"
        >
          {{ prop.name }}
        </a>
      </div>
    </div>
  </div>
  <!-- 骨架  -->
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script>
// API
import { findSubCategoryFilterData } from "@/api/category";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "SubFilter",
  setup() {
    const route = useRoute();
    // 监听二级类目id的变化获取筛选数据
    const filterData = ref(null);
    const filterLoading = ref(false);
    watch(
      () => route.params.id,
      (newVal) => {
        // 变化后的id有值 且处在二级类目路由下
        if (newVal && `/category/sub/${newVal}` === route.path) {
          // 开启loading
          filterLoading.value = true;
          // 发请求获取数据
          findSubCategoryFilterData(route.params.id).then((data) => {
            // 每一组可选的筛选条件缺失'全部'条件，处理下数据加上 "全部"
            // 给每一组数据加上一个选中的ID（将来要做选中功能）默认选中全部
            // 1.品牌
            data.result.brands.selectedBrand = null;
            data.result.brands.unshift({ id: null, name: "全部" });
            // 2.属性前
            data.result.saleProperties.forEach((item) => {
              item.selectedProp = null;
              item.properties.unshift({ id: null, name: "全部" });
            });
            // 设置修改后的数据
            filterData.value = data.result;
            // 关闭loading
            filterLoading.value = false;
          });
        }
      }
    );

    return {
      filterData,
      filterLoading,
    };
  },
};
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
  .xtx-skeleton {
    padding: 10px 0;
  }
}
</style>
