<!--
 * @Descripttion: 无限加载组件
 * @Author: JLX
 * @Date: 2022-08-03 15:22:51
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-04 17:21:02
-->
<template>
  <div class="xtx-infinite-loading" ref="target">
    <!-- 加载中显示 -->
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <!-- 完成加载显示 -->
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
export default {
  name: "XtxInfiniteLoading",
  props: {
    // 加载中
    loading: {
      type: Boolean,
      default: false,
    },
    // 完成加载
    finished: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // 监听target是否进入可视区
    const target = ref(null);
    useIntersectionObserver(
      target,
      ([{ isIntersecting }], dom) => {
        if (isIntersecting) {
          console.log("进入可视区了");
          // 好奇怪，判断进不去
          // emit("infinite");
          console.log(props.loading, props.finished);
          /**
           * 触发加载事件条件
           * 1. 请求loading完成
           * 2. 数据加载完毕
           */
          // 如果现在不是加载中 并且没有加载完数据
          if (props.loading === false && props.finished === false) {
            // 发射事件
            emit("infinite");
          }
        }
      },
      {
        threshold: 0,
      }
    );

    return {
      target,
    };
  },
};
</script>

<style scoped lang="less">
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/images/load.jpg) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(../../assets/images/none.jpg) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
