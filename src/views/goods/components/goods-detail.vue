<!--
 * @Descripttion: 商品详情组件
 * @Author: JLX
 * @Date: 2022-08-12 11:32:51
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-12 14:57:13
-->
<template>
  <div class="goods-detail">
    <ul class="attrs">
      <li v-for="item in goods.details.properties" :key="item.value">
        <span class="dt">{{ item.name }}</span>
        <span class="dd">{{ item.value }}</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img
      v-for="item in goods.details.pictures"
      :key="item"
      :src="item"
      alt=""
    />
  </div>
</template>
<script>
import { inject } from "vue";
export default {
  name: "GoodsDetail",
  setup() {
    const goods = inject("goods");

    return {
      goods,
    };
  },
};
</script>
<style scoped lang="less">
.goods-detail {
  padding: 40px;
  .attrs {
    display: flex;
    flex-wrap: wrap; //设置换行
    margin-bottom: 30px;
    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;
      .dt {
        width: 100px;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
      }
    }
  }
  > img {
    width: 100%;
  }
}
</style>
