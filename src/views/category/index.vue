<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-25 11:02:16
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-04 17:24:42
-->
<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <!-- 做个动画 记得加key  :key="TopCategory.id" key发生变化 节点重新创建 -->
      <!--mode="out-in" 解决平滑的效果 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition name="fade-rigth">
          <XtxBreadItem v-if="TopCategory" :key="TopCategory.id">
            {{ TopCategory.name }}
          </XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height: 500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list" v-if="TopCategory && TopCategory.children">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in TopCategory.children" :key="sub.id">
            <a href="javascript:;">
              <img :src="sub.picture" />
              <p>{{ sub.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body">
          <GoodsItem
            v-for="goods in sub.goods"
            :key="goods.id"
            :goods="goods"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 组件
import xtxBread from "@/components/library/xtx-bread.vue";
import XtxBreadItem from "@/components/library/xtx-bread-item.vue";
import GoodsItem from "./components/goods-item.vue";
// API
import { findBanner } from "@/api/home";
import { findTopCategory } from "@/api/category";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  components: { xtxBread, XtxBreadItem, GoodsItem },
  name: "TopCategory",
  setup() {
    // 轮播图
    const sliders = ref([]);
    findBanner().then((data) => {
      sliders.value = data.result;
    });

    // 面包屑+所有子分类 -------(vuex中)
    const store = useStore();
    const route = useRoute();
    const TopCategory = computed(() => {
      // console.log(route.params.id);
      // console.log(store.state.category.list);

      let cate = {};
      // 当前顶级分类 = 根据路由上的ID去vuex中category模块的list中查找
      const item = store.state.category.list.find((item) => {
        return item.id === route.params.id;
      });
      // 这样就可以不在前面判断
      if (item) cate = item;
      return cate;
    });
    // console.log(TopCategory);

    // 获取各个类目下推荐商品
    const subList = ref([]);
    const getSubList = () => {
      findTopCategory(route.params.id).then((data) => {
        subList.value = data.result.children;
      });
    };
    watch(
      // 监听路由id的改变，改变后调用
      () => route.params.id,
      (newVal) => {
        // 当newVal存在的时候,调用请求
        // newVal && getSubList();
        // 如果当前路由与切换之前的顶级类目相同 才发请求
        if (newVal && `/category/${newVal}` === route.path) getSubList();
      },
      { immediate: true }
    );

    return {
      sliders,
      TopCategory,
      subList,
    };
  },
};
</script>

<style scoped lang="less">
// 面包屑动画
// 进入：从右边 20px位移 透明度0 做过渡0.5s 到本来位置（没有位移 透明度1）
// 离开：本来位置 没有位移 透明度1  做过渡 右侧 20px位移 透明度0
.fade-rigth-enter-from,
.fade-rigth-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.fade-rigth-enter-active,
.fade-rigth-leave-active {
  transition: all 0.5s;
}
.fade-rigth-enter-to,
.fade-rigth-leave-from {
  transform: none;
  opacity: 1;
}

.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
