<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-08-12 11:24:57
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-12 15:03:18
-->
<template>
  <div class="goods-tabs">
    <nav>
      <a
        @click="activeName = 'GoodsDetail'"
        :class="{ active: activeName === 'GoodsDetail' }"
        href="javascript:;"
        >商品详情
      </a>
      <a
        @click="activeName = 'GoodsComment'"
        :class="{ active: activeName === 'GoodsComment' }"
        href="javascript:;"
        >商品评价<span>({{goods.commentCount}})</span>
      </a>
    </nav>
    <!-- 切换内容的地方 其实两个组件-->
    <!-- <GoodsDetail v-if="activeName = 'GoodsDetail'"/> -->
    <!-- <GoodsComment v-if="activeName === 'GoodsComment'"/> -->
    
    <!-- 在vue中动态切换组件 可以使用动态组件 component组件 -->
    <!-- is 属性用来决定component动态组件渲染为哪个组件 组件的名称 -->
    <keep-alive>
      <component :is="activeName"></component>
    </keep-alive>
  </div>
</template>

<script>
import { inject, ref } from "vue";
// 详情组件
import GoodsDetail from "./goods-detail.vue";
import GoodsComment from "./goods-comment.vue";
export default {
  name: "GoodsTabs",
  components: { GoodsDetail, GoodsComment },
  setup() {
    // activeName： GoodsDetail商品详情 GoodsComment
    const activeName = ref("GoodsDetail");

    // goods详情数据
    const goods = inject("goods");

    return {
      activeName,
      goods
    };
  },
};
</script>

<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
