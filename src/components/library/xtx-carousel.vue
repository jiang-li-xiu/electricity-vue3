<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-26 15:37:08
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-12 10:57:45
-->
<template>
  <div class="xtx-carousel" @mouseenter="stop()" @mouseleave="start()">
    <!-- 轮播图图片容器 -->
    <ul class="carousel-body">
      <!-- fade 显示的图片加上-->
      <!-- 当索引值等于下标显示 -->
      <li
        class="carousel-item"
        :class="{ fade: index === i }"
        v-for="(item, i) in sliders"
        :key="i"
      >
        <!-- 图片  -->
        <RouterLink :to="item.hrefUrl" v-if="item.imgUrl">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>

        <!-- 商品列表（商品推荐/猜你喜欢） -->
        <div v-else class="slider">
          <RouterLink
            v-for="goods in item"
            :key="goods.id"
            :to="`/product/${goods.id}`"
          >
            <img :src="goods.picture" alt="" />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </RouterLink>
        </div>
      </li>
    </ul>
    <!-- 上一张 -->
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev">
      <i class="iconfont icon-xiangzuo2"></i>
    </a>
    <!-- 下一张 -->
    <a @click="toggle(1)" href="javascript:;" class="carousel-btn next">
      <i class="iconfont icon-xiangyou3"></i>
    </a>
    <!-- 指示器 -->
    <div class="carousel-indicator">
      <!-- active 激活点 -->
      <span
        v-for="(item, i) in sliders"
        :key="i"
        :class="{ active: index === i }"
        @click="index = i"
      ></span>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref, watch } from "vue";
export default {
  name: "XtxCarousel",
  props: {
    // 轮播图数据
    sliders: {
      type: Array,
      default: () => [],
    },
    // 是否自动轮播 默认false
    autoPlay: {
      type: Boolean,
      default: false,
    },
    // 间隔时长
    duration: {
      type: Number,
      default: 3000,
    },
  },
  setup(props) {
    // 控制显示图片的索引
    const index = ref(0);

    // 自动轮播图的逻辑
    let timer = null;
    const autoPlayFn = () => {
      // 开启定时器之前先清掉上一次的，防止重复
      clearInterval(timer);
      // 自动播放，每隔多久切换索引（由传入参数决定）
      timer = setInterval(() => {
        // 下标++
        index.value++;
        // 重新轮播
        if (index.value >= props.sliders.length) {
          index.value = 0;
        }
      }, props.duration);
    };
    // 自动播放调用条件
    // 1.需要监听sliders数据变化，判断如果有数据且autoPlay是true，才自动播放
    watch(
      () => props.sliders,
      (newValue) => {
        if (newValue.length && props.autoPlay) {
          // 调用自动轮播方法
          autoPlayFn();
        }
      },
      // 如果图片是写死的，监听不到变化，开启立即执行
      { immediate: true }
    );

    // 2.鼠标移入暂停 离开开启（开启条件）
    // 暂停
    const stop = () => {
      if (timer) clearInterval(timer);
    };
    // 开启
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn();
      }
    };

    // 3.点击点点可以切换，上一张下一张
    // 根据当前点索引更改index   @click="index = i"
    const toggle = (step) => {
      // 将要改变的索引
      const newIndex = index.value + step;
      //改变索引大于轮播长度(超出)
      if (newIndex > props.sliders.length - 1) {
        index.value = 0;
        return;
      }
      // 超出情况：太小
      if (newIndex < 0) {
        index.value = props.sliders.length - 1;
        return;
      }
      // 正常
      index.value = newIndex;
    };

    // 4、组件卸载时，清除定时器
    onUnmounted(() => {
      clearInterval(timer);
    });

    return {
      index,
      autoPlayFn,
      stop,
      start,
      toggle,
    };
  },
};
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      //显示图片
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        // 激活指示器
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}

// 轮播商品的样式
.slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
  > a {
    width: 240px;
    text-align: center;
    img {
      padding: 20px;
      width: 230px !important;
      height: 230px !important;
    }
    .name {
      font-size: 16px;
      color: #666;
      padding: 0 40px;
    }
    .price {
      font-size: 16px;
      color: @priceColor;
      margin-top: 15px;
    }
  }
}
</style>
