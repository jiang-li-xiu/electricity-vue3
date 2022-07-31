<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-22 16:25:09
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-27 11:41:41
-->
<template>
  <!-- vue动画 -->
  <!-- 显示隐藏按钮 -->
  <button @click="show = true">显示</button>
  <button @click="show = false">隐藏</button>
  <transition>
    <div v-show="show" class="box"></div>
  </transition>
  <!-- 通过name来指定 -->
  <transition name="h">
    <div v-show="show" class="box"></div>
  </transition>
  <!-- vue动画end -->
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const show = ref(true);
    return {
      show,
    };
  },
};
</script>

<style lang="less" scoped>
// 引入样式
// @import "../../assets/styles/mixins.less";
.container {
  // .hoverShadow();
}

// 使用Transition组件实现动画，一个元素或者组件的（显示|隐藏），创建|移除）

// 进入前 v-enter (vue3: v-enter-from)
// 进入中 v-enter-active
// 进入后 v-enter-to

// 离开前 v-leave (vue3: v-leave-from)
// 离开中 v-leave-active
// 离开后 v-leave-to

// 需求：一个盒子在显示隐藏的时候做淡入淡出动画
// 1、准备盒子
// 2、控制显示隐藏
// 3、加入动画

.box {
  width: 100px;
  height: 100px;
  background: red;
}
.v-enter-from {
  opacity: 0;
}
.v-enter-active {
  transition: all 2s;
}
.v-enter-to {
  opacity: 1;
}
.v-leave-from {
  opacity: 1;
}
.v-leave-active {
  transition: all 2s;
}
.v-leave-to {
  opacity: 0;
}

.h-enter-from {
  opacity: 0;
}
.h-enter-active {
  transition: all 2s;
}
.h-enter-to {
  opacity: 1;
}
.h-leave-from {
  opacity: 1;
}
.h-leave-active {
  transition: all 2s;
}
.h-leave-to {
  opacity: 0;
}
</style>
