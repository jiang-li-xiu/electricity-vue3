<!--
 * @Author: jiang-li-xiu 2663282851@qq.com
 * @Date: 2022-08-07 14:46:24
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-08 09:51:47
 * @FilePath: \electricity-vue3\src\views\goods\index.vue
 * @Description: 放大镜
-->
<template>
  <div class="goods-image">
    <!-- 放大图 -->
    <div
      v-show="show"
      class="large"
      :style="[{ backgroundImage: `url(${images[currIndex]})` }, largePosition]"
    ></div>
    <!-- 左边的中图 -->
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="" />
      <!-- 待移动的遮罩容器 -->
      <div v-show="show" class="layer" :style="layerPosition"></div>
    </div>
    <!-- 小图 -->
    <ul class="small">
      <li
        v-for="(img, i) in images"
        :key="img"
        :class="{ active: i === currIndex }"
      >
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, watch } from "vue";
import { useMouseInElement } from "@vueuse/core";
export default {
  name: "GoodsImage",
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    // 当前预览图的索引
    const currIndex = ref(0);

    // 1. 是否显示遮罩和大图
    const show = ref(false);
    // 2. 控制遮罩的坐标(样式)
    const layerPosition = reactive({
      left: 0,
      top: 0,
    });
    // 3. 大图背景定位(样式)
    const largePosition = reactive({
      backgroundPositionX: 0,
      backgroundPositionY: 0,
    });
    // 4. 使用useMouseInElement得到基于元素左上角的坐标和是否离开元素数据
    // target监听的元素 isOutside是否显示
    const target = ref(null);
    const { elementX, elementY, isOutside } = useMouseInElement(target);
    // 监听坐标的变化
    watch([elementX, elementY, isOutside], () => {
      // console.log(elementX.value, elementY.value, isOutside.value);
      // 5. 根据数据设置样式和是否显示数据
      // （isOutside为真在外面，为假在里面）
      show.value = !isOutside.value;
      // 遮罩层坐标
      // 先记录当前坐标
      const position = { x: 0, y: 0 };
      // 计算坐标 ---如果x坐标小于100 大于300 移不动
      if (elementX.value < 100) position.y = 0;
      else if (elementX.value > 300) position.x = 200;
      else position.x = elementX.value - 100;

      // y坐标
      if (elementY.value < 100) position.y = 0;
      else if (elementY.value > 300) position.y = 200;
      else position.y = elementY.value - 100;

      // 给样式赋值
      layerPosition.left = position.x + "px";
      layerPosition.top = position.y + "px";
      // 放大两倍
      largePosition.backgroundPositionX = -2 * position.x + "px";
      largePosition.backgroundPositionY = -2 * position.y + "px";
    });

    return {
      currIndex,
      show,
      layerPosition,
      largePosition,
      target,
    };
  },
};
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 放大两倍
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
