<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-22 16:25:09
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-27 16:29:40
-->
<template>
  <!-- 首页入口（分类、广告区） -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory></HomeCategory>
      <!-- 轮播图 -->
      <HomeBanner></HomeBanner>
    </div>
  </div>
  <!-- 新鲜好物模块 -->
  <HomeNew></HomeNew>
  <!-- 人气推荐 -->
  <HomeHot></HomeHot>
  <!--热门品牌 -->
  <HomeBrand></HomeBrand>
  <!-- 产品区块 -->
  <HomeProdect></HomeProdect>
  <!-- 专题板块 -->
  <HomeSpecical></HomeSpecical>
</template>

<script>
import HomeCategory from "./components/home-category.vue";
// 轮播图
import HomeBanner from "./components/home-banner.vue";
// 新鲜好物
import HomeNew from "./components/home-new";
// 人气推荐
import HomeHot from "./components/home-hot";
// 热门品牌
import HomeBrand from "./components/home-brand";
// 产品区块
import HomeProdect from "./components/home-produce";
// 专题
import HomeSpecical from './components/home-specical'
export default {
  name: "home",
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProdect,
    HomeSpecical,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="less" scoped></style>
