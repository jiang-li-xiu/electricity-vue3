<!--
 * @Author: jiang-li-xiu 2663282851@qq.com
 * @Date: 2022-08-21 12:52:38
 * @LastEditors: jiang-li-xiu 2663282851@qq.com
 * @LastEditTime: 2022-08-21 15:39:54
 * @FilePath: \electricity-vue3\src\views\cart\components\cart-sku.vue
 * @Description: 购物车的规格组件   
-->
<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <!-- 弹层 -->
    <div class="layer" v-if="visible">
      <div v-if="loading" class="loading"></div>
      <GoodsSku
        @change="changeSku"
        :skuId="skuId"
        v-else
        :goods="goods"
      ></GoodsSku>
      <!-- 确认按钮 -->
      <XtxButton
        v-if="!loading"
        @click="submit"
        type="primary"
        size="mini"
        style="margin-left: 60px"
        >确认
      </XtxButton>
    </div>
  </div>
</template>
<script>
// API
import { getGoodsSku } from "@/api/cart";
// 组件
import GoodsSku from "@/views/goods/components/goods-sku.vue";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
export default {
  name: "CartSku",
  components: { GoodsSku },
  props: {
    attrsText: {
      type: String,
      default: "",
    },
    skuId: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const visible = ref(false);

    const goods = ref(null);
    const loading = ref(false);
    // 打开
    const open = () => {
      visible.value = true;
      // 获取商品数据（specs,skus）
      loading.value = true;
      getGoodsSku(props.skuId).then((data) => {
        goods.value = data.result;
        loading.value = false;
      });
    };
    // 关闭
    const close = () => {
      visible.value = false;
    };
    // 切换
    const toggle = () => {
      visible.value ? close() : open();
    };
    // 点击其他地方关闭
    const target = ref(null);
    onClickOutside(target, () => {
      close();
    });

    // 监听sku改变的函数记录选择的sku信息
    const currSku = ref(null);
    const changeSku = (sku) => {
      currSku.value = sku;
    };

    // 点击确认的时候 将更改后的sku信息提交给购物车组件（父组件）
    const submit = () => {
      // 通知父组件 当currSku有值 且skuId和默认的skuId不同
      if (
        currSku.value &&
        currSku.value.skuId &&
        currSku.value !== props.skuId
      ) {
        emit("change", currSku.value);
        close()
      }
    };

    return {
      visible,
      open,
      close,
      toggle,
      target,
      goods,
      loading,
      changeSku,
      submit,
    };
  },
};
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/images/load.jpg) no-repeat center;
    }
  }
}
</style>