<!--
 * @Descripttion: 商品热榜
 * @Author: JLX
 * @Date: 2022-08-12 11:51:14
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-12 14:39:25
-->
<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <div v-if="goodsList">
      <GoodsItem v-for="item in goodsList" :key="item.id" :goods="item" />
    </div>
  </div>
</template>
<script>
// API
import { findGoodsHot } from "@/api/product";
import GoodsItem from "@/views/category/components/goods-item.vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "GoodsHot",
  components: { GoodsItem },
  props: {
    // 热榜类型
    type: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    // 类型数据字典
    const titleObj = { 1: "24小时热销榜", 2: "周热销榜", 3: "总热销榜" };
    // 拿到标题
    const title = computed(() => {
      return titleObj[props.type];
    });

    // 发请求
    const route = useRoute(); //地址栏的id
    const goodsList = ref([]);
    findGoodsHot({ id: route.params.id, type: props.type }).then((data) => {
      goodsList.value = data.result;
    });

    return { title, goodsList };
  },
};
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
