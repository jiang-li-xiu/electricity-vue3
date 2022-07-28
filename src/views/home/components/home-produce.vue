<template>
  <div class="home-product" ref="target">
    <HomePanel :title="cate.name" v-for="cate in list" :key="cate.id">
      <template v-slot:right>
        <div class="sub">
          <RouterLink
            :to="`/category/sub/${sub.id}`"
            v-for="sub in cate.children"
            :key="sub.id"
          >
            {{ sub.name }}
          </RouterLink>
        </div>
        <XtxMore :path="`/category/${cate.id}`" />
      </template>
      <div class="box">
        <RouterLink class="cover" :to="`/category/${cate.id}`">
          <!-- 懒加载 自定义指令 v-lazy -->
          <img v-lazy="cate.picture" alt="" />
          <strong class="label">
            <span>{{ cate.name }}</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="item in cate.goods" :key="item.id">
            <HomeGoods :goods="item" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
// API
import { findGoods } from "@/api/home";
// 组件 面板
import HomePanel from "./home-panel";
// 单个商品
import HomeGoods from "./home-goods";
// 导入懒加载函数
import { useLazyDate } from "@/hooks";
export default {
  name: "HomeProduct",
  components: { HomePanel, HomeGoods },
  setup() {
    // 获取商品板块数据
    const { target, result } = useLazyDate(findGoods);
    return {
      target,
      list: result,
    };
  },
};
</script>

<style scoped lang="less">
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        // 多余裁剪
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
