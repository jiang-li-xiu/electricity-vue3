<template>
  <!-- 1.1 使用A模块的state数据 -->
  <p>{{ $store.state.moduleA.userName }}</p>
  <!-- 1.2.使用A模块的getters -->
  <p>{{ $store.getters.newName }}</p>

  <!-- 2.1 使用B模块的state数据 (开启了命名空间)-->
  <p>{{ $store.state.moduleB.userName }}</p>
  <!-- 2.2.使用B模块的getters (带命名空间的使用)-->
  <p>{{ $store.getters["moduleB/newName"] }}</p>
  <!-- 2.3  -->
  <button @click="mutationsFn">mutations</button>
  <button @click="actionsFn">actions</button>
</template>
<script>
import { useStore } from "vuex";
export default {
  name: "App",
  setup() {
    const store = useStore();
    const mutationsFn = () => {
      //  2.3提交B模块的修改
      store.commit("moduleB/updateName");
    };

    const actionsFn = () => {
      // 2.4调用B模块的actions
      store.dispatch('moduleB/updateName')
    };

    return {
      mutationsFn,
      actionsFn,
    };
  },
};
</script>

<style lang="less"></style>
