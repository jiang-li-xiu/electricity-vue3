<!--
 * @Author: jiang-li-xiu 2663282851@qq.com
 * @Date: 2022-08-07 14:47:22
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-12 11:19:50
 * @FilePath: \electricity-vue3\src\views\goods\components\goods-relevant.vue
 * @Description: 猜你喜欢
-->
<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{ goodsId ? "同类商品推荐" : "猜你喜欢推荐" }}</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <xtx-carousel :sliders="sliders"></xtx-carousel>
  </div>
</template>

<script>
// API
import { findRelevantGoods } from "@/api/product";
import { ref } from "vue-demi";
import xtxCarousel from "@/components/library/xtx-carousel.vue";
export default {
  components: { xtxCarousel },
  // 同类推荐，猜你喜欢
  name: "GoodsRelevant",
  props: {
    goodsId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // 获取商品同类推荐列表数据 传id表示查询相关商品，不传猜你喜欢
    // 最终需要是数据是sliders 提供给轮播图使用 sliders = [[4个],[4个],[4个],[4个]]
    const sliders = ref([]);
    const goodsList = findRelevantGoods({ id: props.goodsId }).then((data) => {
      // data.result 商品列表，数据结构[16g个]
      // 将data.result数据赋值给sliders 保证数据结构正确

      const pageSize = 4;
      // 算出多少页
      const pageCount = Math.ceil(data.result.length / pageSize); //Math.ceil取整
      for (let i = 0; i < pageCount; i++) {
        // 截取页条
        sliders.value.push(data.result.slice(pageSize * i, pageSize * (i + 1)));
      }
      // console.log(sliders.value);
    });

    return {
      sliders,
    };
  },
};
</script>

<style scoped lang="less">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
}
// ::v-deep ==>Vue3已废弃
:deep(.xtx-carousel) {
  height: 380px; //轮播图高度
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @xtxColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0, 0, 0, 0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
</style>
