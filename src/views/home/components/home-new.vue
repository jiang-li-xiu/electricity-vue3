<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-27 10:57:55
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-27 15:02:03
-->

// 新鲜好物
<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <!-- 右边插槽 -->
      <template #right>
        <!-- 查看更多组件 -->
        <XtxMore path="/"></XtxMore>
      </template>

      <!-- 面板内容 -->
      <!-- 使用动画 -->
      <div ref="target" style="position: relative; height: 426px">
        <transition name="fade">
          <!-- goods有数据展示 -->
          <ul v-if="goods.length" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img :src="item.picture" alt="" />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
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
import { findNew } from "@/api/home";
// 面板组件
import HomePanel from "./home-panel.vue";
// 查看更多组件
import XtxMore from "@/components/library/xtx-more";
// 骨架组件
import HomeSkeleton from "./home-skeleton";
// 导入懒加载函数
import { useLazyDate } from "@/hooks";
// 组合api
import { ref } from "vue";
export default {
  components: { HomePanel, XtxMore, HomeSkeleton },
  setup() {
    // 获取新鲜好物数据
    // const goods = ref([]);
    // findNew().then((data) => {
    //   goods.value = data.result;
    // });

    /**
     * 懒加载使用
     * 1. target 区绑定一个监听对象 最好是DOM
     * 2. 传入API函数,内部获取调用,返回就是响应式数据
     */
    // const target = ref(null);
    const { target, result } = useLazyDate(findNew);
    return {
      goods: result,
      target,
    };
  },
};
</script>

<style lang="less" scoped>
// 动画 离开时淡出
// .fade {
//   &-leave {
//     &-active {
//       position: absolute;
//       width: 100%;
//       transition: opacity 0.5s 0.2s;
//       z-index: 1;
//     }
//     &-to {
//       opacity: 0;
//     }
//   }
// }
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
