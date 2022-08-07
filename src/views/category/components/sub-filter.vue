<!--
 * @Descripttion: 筛选区
 * @Author: JLX
 * @Date: 2022-08-02 15:04:35
 * @LastEditors: jiang-li-xiu 2663282851@qq.com
 * @LastEditTime: 2022-08-07 14:12:26
-->
<template>
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <!-- 默认选中全部 点击将id变为当前选中id  filterData.brands.selectedBrand = item.id -->
        <a
          @click="changeBrand(item.id)"
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
        <!-- item.selectedProp = prop.id -->
        <a
          @click="changeProp(item, prop.id)"
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
  setup(props, { emit }) {
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
      },
      { immediate: true }
    );

    // 获取筛选参数的函数
    const getFilterParams = () => {
      // 参考数据：{brandId:'',attrs:[{groupName:'',propertyName:''},...]}
      const obj = { brandId: null, attrs: [] };
      // 品牌
      obj.brandId = filterData.value.selectedBrand;
      // 销售属性
      filterData.value.saleProperties.forEach((item) => {
        if (item.selectedProp) {
          const prop = item.properties.find(
            (prop) => prop.id === item.selectedProp
          );
          obj.attrs.push({ groupName: item.name, propertyName: prop.name });
        }
      });
      console.log(obj);
      // 如果选择是空的 attrs传空
      if (obj.attrs.length === 0) obj.attrs = null;

      return obj;
    };

    // 1. 记录当前选择的品牌
    const changeBrand = (brandId) => {
      // 如果当前选中的ID就是已经选中ID
      if (filterData.value.selectedBrand === brandId) return;
      filterData.value.selectedBrand = brandId;
      emit("filter-change", getFilterParams());
    };
    // 2. 记录已选择的销售属性
    const changeProp = (item, propId) => {
      if (item.selectedProp === propId) return;
      item.selectedProp = propId;
      emit("prop-change", getFilterParams());
    };

    return {
      filterData,
      filterLoading,
      changeBrand,
      changeProp,
      getFilterParams,
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
