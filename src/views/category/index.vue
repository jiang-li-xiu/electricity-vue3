<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-25 11:02:16
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-28 11:12:23
-->
<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <xtx-bread>
        <xtx-bread-item :to="{ path: '/' }">首页</xtx-bread-item>
        <xtx-bread-item >首页</xtx-bread-item>
        <xtx-bread-item >首页</xtx-bread-item>
      </xtx-bread>
      <!-- 轮播图 -->
      <!-- 全部分类 -->
      <!-- 各个分类推荐商品 -->
    </div>
  </div>
</template>

<script>
import xtxBread from "@/components/library/xtx-bread.vue";
import XtxBreadItem from "@/components/library/xtx-bread-item.vue";
export default {
  components: { xtxBread, XtxBreadItem },
  name: "TopCategory",
};
</script>

<style lang="less" scoped></style>
