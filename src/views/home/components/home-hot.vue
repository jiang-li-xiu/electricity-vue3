<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-27 11:14:25
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-27 15:01:31
-->
<template>
  <div class="home-hot">
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
      <!-- 右边插槽 空-->

      <!-- 面板内容  -----target目标元素--------        -->
      <div ref="target" style="position: relative; height: 426px">
        <transition name="fade">
          <!-- list有数据展示 -->
          <ul v-if="list.length" ref="pannel" class="goods-list">
            <li v-for="item in list" :key="item.id">
              <RouterLink to="/">
                <img :src="item.picture" alt="" />
                <p class="name">{{ item.title }}</p>
                <p class="desc">{{ item.alt }}</p>
              </RouterLink>
            </li>
          </ul>
          <!-- 否则展示骨架 -->
          <home-skeleton v-else bg="f0f9f4"></home-skeleton>
        </transition>
      </div>
    </HomePanel>
  </div>
</template>

<script>
// API
import { findHot } from "@/api/home";
// 面板组件
import HomePanel from "./home-panel.vue";
// 骨架组件
import HomeSkeleton from "./home-skeleton";
// 导入懒加载函数
import { useLazyDate } from "@/hooks";
import { ref } from "vue";
export default {
  components: {
    HomePanel,
    HomeSkeleton,
  },
  setup() {
    // 获取人气爆款数据
    // const list = ref([]);
    // findHot().then((data) => {
    //   list.value = data.result;
    // });

    /**
     * 懒加载使用
     * 1. target 区绑定一个监听对象 最好是DOM
     * 2. 传入API函数,内部获取调用,返回就是响应式数据
     */
    const { target, result } = useLazyDate(findHot);

    return {
      target,
      list: result,
    };
  },
};
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
