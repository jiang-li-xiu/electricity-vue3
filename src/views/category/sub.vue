<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-25 11:02:31
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-02 17:13:24
-->
<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <sub-brand></sub-brand>
      <!-- 筛选区 -->
      <SubFilter></SubFilter>
      <!--  -->
      <xtx-checkbox v-model="isAllChecked">全选</xtx-checkbox>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import SubBrand from "./components/sub-brand.vue";
import SubFilter from "./components/sub-filter.vue";
export default {
  name: "SubCategory",
  components: { SubBrand, SubFilter },
  setup(){
    const isAllChecked = ref(true)

    return{
      isAllChecked
    }
  }
};
</script>

<style lang="less" scoped></style>
