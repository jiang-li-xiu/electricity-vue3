<!--
 * @Author: jiang-li-xiu 2663282851@qq.com
 * @Date: 2022-08-07 14:46:24
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-16 17:43:51
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
          <!-- 商品规格sku -->
          <GoodsSku :goods="goods" skuId="" @change="changeSku" />
          <!-- 数量组件 -->
          <XtxNumbox v-model="num" :max="goods.inventory" />
          <!-- 按钮 -->
          <XtxButton
            @click="insertCart()"
            type="primary"
            style="margin-top: 20px"
            >加入购物车
          </XtxButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <GoodsTabs />
          </div>
          <!-- 注意事项 -->
          <div class="goods-warn">
            <GoodsWarn />
          </div>
        </div>
        <!-- 24热榜+周榜推荐 -->
        <div class="goods-aside">
          <GoodsHot />
          <GoodsHot :type="2" />
          <GoodsHot :type="3" />
        </div>
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
import XtxNumbox from "@/components/library/xtx-numbox.vue";
import XtxButton from "@/components/library/xtx-button.vue";
import GoodsTabs from "./components/goods-tabs.vue";
import GoodsHot from "./components/goods-hot.vue";
import GoodsWarn from "./components/goods-warn.vue";
// API
import { findGoods } from "@/api/product";
import { nextTick, ref, watch, provide } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Message from "@/components/library/Message";
export default {
  name: "XtxGoodsPage",
  components: {
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku,
    XtxNumbox,
    XtxButton,
    GoodsTabs,
    GoodsHot,
    GoodsWarn,
  },
  setup() {
    // 1. 获取商品详情，进行渲染
    const goods = useGoods();

    // 接收sku传过来的值
    const changeSku = (sku) => {
      // console.log(sku);
      // 修改商品的现价原价库存信息
      if (sku.skuId) {
        goods.value.price = sku.price;
        goods.value.oldPrice = sku.oldPrice;
        goods.value.inventory = sku.inventory;
      }
      // 记录选择后的sku 可能有数据 可能没数据{}
      currSku.value = sku;
    };

    // 提供goods数据给后代组件使用
    provide("goods", goods);

    // 加入购物车（要存到vuex）
    const store = useStore();
    const currSku = ref(null);
    const insertCart = () => {
      // TODO 判断规格是否完整 完整才能加到购物车
      if (currSku.value && currSku.value.skuId) {
        //调用actions name attrsText picture price nowPrice selected stock count isEffective
        const { skuId, specsText: attrsText, inventory: stock } = currSku.value
        const { id, name, price, mianPictures } = goods.value
        store
          .dispatch("cart/insertCart", {
            id,
            skuId,
            attrsText,
            stock,
            name,
            price,
            picture: mianPictures,
            nowPrice: price,
            selected: true,
            isEffective: true,
            count: num.value,
          })
          .then(() => {
            Message({ type: "success", text: "添加购物车成功" });
          });
      } else {
        Message({ text: "请选择完整的规格" });
      }
    };

    // 默认传的数量
    const num = ref(1);
    return {
      goods,
      changeSku,
      num,
      insertCart,
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
// .goods-tabs {
//   min-height: 600px;
//   background: #fff;
// }
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
