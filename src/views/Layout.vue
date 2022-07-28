<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-21 15:32:13
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-26 10:47:23
-->
<template>
  <!-- 顶部通栏 -->
  <AppNavaBar></AppNavaBar>
  <!-- 头部组件 -->
  <AppHeader></AppHeader>
  <!-- 吸顶头部 -->
  <AppHeaderSticky></AppHeaderSticky>
  <!-- 内容容器 -->
  <div class="app-body">
    <!-- 二级路由 -->
    <router-view></router-view>
  </div>
  <!-- 底部组件 -->
  <AppFooter></AppFooter>

  <!-- <button @click="$store.commit('user/setUser',{})">logoout</button>
  <button @click="$store.commit('user/setUser',{token:123,account:'11'})">login</button> -->
</template>

<script>
import AppNavaBar from "@/components/app-navbar.vue";
import AppHeader from "@/components/app-header.vue";
import AppHeaderSticky from "@/components/app-header-sticky.vue";
import AppFooter from "@/components/app-footer.vue";
import { useStore } from "vuex";
import { onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "Layout",
  components: { AppNavaBar, AppHeader, AppFooter, AppHeaderSticky },
  // 获取下分类数据
  setup() {
    const store = useStore();
    store.dispatch("category/getList");
    const router = useRouter();
    onMounted(() => {
      console.log(router);
    });
    return {};
  },
};
</script>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
