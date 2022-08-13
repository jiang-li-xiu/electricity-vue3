<!--
 * @Author: jiang-li-xiu 2663282851@qq.com
 * @Date: 2022-08-13 14:15:19
 * @LastEditors: jiang-li-xiu 2663282851@qq.com
 * @LastEditTime: 2022-08-13 14:29:39
 * @FilePath: \electricity-vue3\src\views\goods\components\goods-comment-image.vue
 * @Description: 
-->
<template>
  <div class="goods-comment-image">
    <div class="list">
      <a
        @click="currImage = item"
        :class="{ active: currImage === item }"
        v-for="(item, i) in pictures"
        :key="i"
        href="javascript:;"
      >
        <img :src="item" alt="" />
      </a>
    </div>
    <!-- 大图 -->
    <div class="preview" v-if="currImage">
      <img :src="currImage" alt="" />
      <!-- 关闭的按钮 X 当前tupweinull 关闭 -->
      <i @click="currImage = null" class="iconfont icon-close-new"></i>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "GoodsCommentImage",
  props: {
    pictures: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    // 显示当前图
    const currImage = ref(null);

    return {
      currImage,
    };
  },
};
</script>
<style scoped lang="less">
.goods-comment-image {
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    a {
      width: 120px;
      height: 120px;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      &.active {
        border-color: @xtxColor;
      }
    }
  }
}
.preview {
  width: 480px;
  height: 480px;
  border: 1px solid #e4e4e4;
  background: #f8f8f8;
  margin-bottom: 20px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  i {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    text-align: center;
    line-height: 30px;
  }
}
</style>