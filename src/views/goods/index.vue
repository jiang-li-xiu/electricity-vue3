<!--
 * @Author: jiang-li-xiu 2663282851@qq.com
 * @Date: 2022-08-07 14:46:24
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-09 11:42:35
 * @FilePath: \electricity-vue3\src\views\goods\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.categories[1].id}`">{{
          goods.categories[1].name
        }}</XtxBreadItem>
        <XtxBreadItem :to="`category/sub/${goods.categories[0].id}`">{{
          goods.categories[0].name
        }}</XtxBreadItem>
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
        <!-- goods.name 商品名称 -->
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <!-- 图片放大镜 -->
          <GoodsImage :images="goods.mainPictures" />
          <!-- 商品详情基本信息 -->
          <GoodsSales />
        </div>
        <div class="spec">
          <!-- 商品名称 -->
          <GoodsName :goods="goods" />
          <!-- 商品规格 -->
          <GoodsSku :goods="goods"/>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
// 组件
import GoodsRelevant from "./components/goods-relevant";
// 放大镜
import GoodsImage from "./components/goods-image";
// 商品详情基本信息
import GoodsSales from "./components/goods-sales";
// 商品名称
import GoodsName from "./components/goods-name";
// 规格
import GoodsSku from "./components/goods-sku.vue";
// API
import { findGoods } from "@/api/product";
import { nextTick, ref, watch } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "XtxGoodsPage",
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName, GoodsSku },
  setup() {
    // 1. 获取商品详情，进行渲染
    const goods = useGoods();
    return {
      goods,
    };
  },
};
// 1. 获取商品详情，进行渲染
const useGoods = () => {
  //有可能出现路由商品ID发生变化，但是不会重新初始化组件。（监听）
  //定义商品
  const goods = ref(null);
  const route = useRoute();

  watch(
    () => route.params.id,
    (newVal) => {
      // `product/${newVal}` === route.path 商品详情的时候
      //   if (newVal && `product/${newVal}` === route.path) {
      findGoods(route.params.id).then((data) => {
        //让商品数据为空，使用v-if的组件可以重新销毁和创建，不用每次都监听
        console.log(data);
        // 先给个null 生效
        goods.value = null;

        // 再赋值
        nextTick(() => {
          goods.value = data.result;
        });
      });
      //   }
    },
    { immediate: true }
  );
  return goods;
};
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
