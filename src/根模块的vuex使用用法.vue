<template>
  <!-- 1.使用根模块state的数据 -->
  <p>{{ $store.state.username }}</p>
  <!-- 2.使用根模块getters数据 -->
  <p>{{ $store.getters.newName }}</p>
  <button @click="changeName">changeName</button>
</template>
<script>
import { useStore } from "vuex";
export default {
  name: "App",
  setup() {
    // 使用vuex
    const store = useStore();
    // 1.使用根模块state的数据
    console.log(store.state.username);
    // 2.使用根模块getters数据
    console.log(store.getters.newName);

    const changeName = () => {
      // 3.提交根模块mutations函数
      // store.commit("updateName");
      //4.调用根模块actions
      store.dispatch("updateName");
    };

    return {
      changeName,
    };
  },
};
</script>

<style lang="less"></style>
