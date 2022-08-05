<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-25 11:02:31
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-04 17:52:08
-->
<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <sub-brand></sub-brand>
      <!-- 筛选区 -->
      <SubFilter></SubFilter>
      <!--测试全选组件  -->
      <!-- <xtx-checkbox v-model="isAllChecked">全选</xtx-checkbox> -->
      <!-- 商品面板（排序组件 + 列表） -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change="sortChange"></SubSort>
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <GoodsItem :goods="goods" />
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <XtxInfiniteLoading
          @infinite="getData"
          :loading="loading"
          :finished="finished"
        ></XtxInfiniteLoading>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import SubBrand from "./components/sub-brand.vue";
import SubFilter from "./components/sub-filter.vue";
// 商品列表
import GoodsItem from "./components/goods-item.vue";
// 排序组件
import SubSort from "./components/sub-sort.vue";
// 无限加载
import XtxInfiniteLoading from "@/components/library/xtx-infinite-loading.vue";
import { findSubCategoryGoods } from "@/api/category";
import { useRoute } from "vue-router";
export default {
  name: "SubCategory",
  components: { SubBrand, SubFilter, SubSort, GoodsItem, XtxInfiniteLoading },
  setup() {
    const route = useRoute();
    // 加载中
    const loading = ref(false);
    // 是否加载完毕
    const finished = ref(false);

    // 商品列表数据
    const goodsList = ref([]);
    // 请求参数
    let reqParams = {
      page: 1,
      pageSize: 20,
    };

    // 获取数据
    const getData = () => {
      console.log("加载数据");
      loading.value = true;
      // 设置二级分类发ID
      reqParams.categoryId = route.params.id;
      // 请求
      findSubCategoryGoods(reqParams).then(({ result }) => {
        // 获取数据成功 result.items商品集合
        if (result.items.length) {
          // 有数据 追加数据
          goodsList.value.push(...result.items);
          loading.value = false;
          console.log(goodsList.value);
          // 把page改成下一页页码
          reqParams.page++;
        } else {
          // 没有数据情况 代表加载完成
          finished.value = true;
        }
        loading.value = false;
      });
    };

    // 更改了二级分类的时候需要重新加载数据
    watch(
      () => route.params.id,
      (newVal) => {
        // 在当前路径下
        if (newVal && `/category/sub/${newVal}` === route.path) {
          goodsList.value = [];
          reqParams = {
            page: 1,
            pageSize: 20,
          };
          finished.value = false;
        }
      }
    );

    // 1. 更改排序自己的筛选属性，重新请求
    // 来自sub-sort发射的事件 sortParams:点击的筛选条件
    const sortChange = (sortParams) => {
      // console.log(sortParams);
      // 合并请求参数，保留之前参数
      reqParams = { ...reqParams, ...sortParams };
      reqParams.page = 1
      goodsList.value = [];
      finished.value = false;
    };

    // 2. 更改筛选组件的筛选数据，重新请求
   
    return {
      loading,
      finished,
      getData,
      goodsList,
      sortChange,
    };
  },
};
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
