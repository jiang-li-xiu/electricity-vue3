<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-08-02 10:49:02
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-02 11:04:17
-->
<template>
  <RouterLink :to="`/prodect/${goods.id}`" class="goods-item">
    <img :src="goods.picture" alt="" />
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
  </RouterLink>
</template>

<script>
export default {
  name: "GoodsItem",
  props: {
    goods: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped lang="less">
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  .hoverShadow();
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: @priceColor;
    font-size: 20px;
  }
}
</style>
