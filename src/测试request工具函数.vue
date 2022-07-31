<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-21 15:11:37
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-22 14:05:09
-->
<template>
  <!-- 修改数据 -->
  {{ $store.state.user.profile.account }}
  <button @click="$store.commit('user/setUser', { account: 'zhou' })">
    设置用户信息
  </button>

  <button @click="fn">测试request工具函数</button>
</template>
<script>
import { useStore } from "vuex";
import request from "@/utils/request.js";
export default {
  name: "App",
  setup() {
    const fn = () => {
      // 测试请求
      request("/member/profile", "get", {a:10});

    };
    return {
      fn,
    };
  },
};
</script>

<style lang="less"></style>
