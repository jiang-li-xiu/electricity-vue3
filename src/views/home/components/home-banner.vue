<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-26 15:39:04
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-27 14:45:47
-->
<template>
  <div class="home-banner">
    <xtx-carousel auto-play :sliders="sliders"></xtx-carousel>
  </div>
</template>

<script>
// API
import { findBanner } from "@/api/home";
// 组件
import xtxCarousel from "@/components/library/xtx-carousel.vue";
//
import { ref } from "vue";

export default {
  components: { xtxCarousel },
  name: "HomeBanner",
  setup() {
    // 获取广告区的轮播图的数据
    const sliders = ref([]);
    findBanner().then((data) => {
      sliders.value = data.result;
      // console.log(sliders.value);
    });
    return {
      sliders,
    };
  },
};
</script>
<style lang="less" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
// 覆盖轮播图的样式 （居中）
.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
