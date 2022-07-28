<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-27 15:03:18
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-27 15:44:21
-->
<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a
        @click="toggle(-1)"
        :class="{ disabled: index == 0 }"
        href="javascript:;"
        class="iconfont icon-xiangzuo2 prev"
      ></a>
      <a
        @click="toggle(1)"
        :class="{ disabled: index == 1 }"
        href="javascript:;"
        class="iconfont icon-xiangyou3 next"
      ></a>
    </template>
    <div class="box" ref="target">
      <!-- 动画 -->
      <transition name="fade">
        <!-- 品牌有数据是展示 -->
        <template v-if="brands.length">
          <ul
            class="list"
            :style="{ transform: `translateX(${-index * 1240}px)` }"
          >
            <li v-for="i in brands" :key="i.id">
              <RouterLink to="/">
                <img :src="i.picture" alt="" />
              </RouterLink>
            </li>
          </ul>
        </template>
        <!-- 无数据 -->
        <div v-else class="skeleton">
          <XtxSkeleton
            class="item"
            v-for="i in 5"
            :key="i"
            animated
            bg="#e4e4e4"
            width="240px"
            height="305px"
          />
        </div>
      </transition>
    </div>
  </HomePanel>
</template>

<script>
// API
import { findBrand } from "@/api/home";
// 面板组件
import HomePanel from "./home-panel";
// 导入懒加载函数
import { useLazyDate } from "@/hooks";
import { ref } from "vue-demi";
export default {
  name: "HomeBrand",
  components: { HomePanel },
  setup() {
    // 获取品牌的数据
    // const brands = ref([]);
    // findBrand(10).then((data) => {
    //   brands.value = data.result;
    // });

    /**
     * 懒加载
     * 注: useLazyDate需要的是API函数 如果遇到传参情况,自己写函数在函数中调用API
     */
    const { target, result } = useLazyDate(() => findBrand(10));

    /**
     * 切换效果,前提只有0 1 两页
     * 1. 点击上一页
     * 2. 点击下一页
     */
    const index = ref(0);
    const toggle = (step) => {
      const newIndex = index.value + step;
      // 小于0 大于1不能点
      if (newIndex < 0 || newIndex > 1) return;
      index.value = newIndex;
    };

    return {
      brands: result,
      toggle,
      index,
      target,
    };
  },
};
</script>

<style scoped lang="less">
// 骨架样式
.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
