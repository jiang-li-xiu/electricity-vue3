<!--
 * @Descripttion: 面包屑每项 item 
 * @Author: JLX
 * @Date: 2022-07-28 11:00:54
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-28 14:24:40
-->
<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to">
      <slot></slot>
    </RouterLink>
    <!-- 不可跳转  -->
    <span v-else><slot></slot></span>
  </div>
  <!-- 通过render函数创建 > -->
  <!-- <i class="iconfont icon-xiangyou1"></i> -->
</template>

<script>
export default {
  name: "XtxBreadItem",
  props: {
    // 路径
    to: {
      type: [String, Object],
      default: "",
    },
    // 文字
    parentName: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>
