<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-27 10:52:43
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-27 10:58:24
-->

// 面板组件

<template>
  <!-- 查看更多 -->
  <!-- <XtxMore></XtxMore> -->
  
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>
          {{ title }}<small>{{ subTitle }}</small>
        </h3>
        <!-- 右上角插槽 -->
        <slot name="right" />
      </div>
      <!-- 默认插槽 面板内容 -->
      <slot />
    </div>
  </div>
</template>

<script>
import XtxMore from "@/components/library/xtx-more";
export default {
  name: "HomePanel",
  components: { XtxMore },
  props: {
    // 标题
    title: {
      type: String,
      default: "",
    },
    // 副标题
    subTitle: {
      type: String,
      default: "",
    },
  },
};
</script>


<style scoped lang='less'>
.home-panel {
  background-color: #fff;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;
      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
