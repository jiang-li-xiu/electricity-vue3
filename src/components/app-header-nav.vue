<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-25 10:08:57
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-02 14:28:32
-->
<template>
  <ul class="app-header-nav">
    <!-- {{$store.state.category.list}} -->
    <li class="home"><RouterLink to="/">首页</RouterLink></li>

    <!-- 一级分类 -->
    <li v-for="item in list" :key="item.id" @mousemove="show(item)" @mouseleave="hide(item)">
      <router-link @click="hide(item)" :to="`/category/${item.id}`">
        {{ item.name }}
      </router-link>

      <!-- 二级分类 -->
      <div class="layer" :class="{ open: item.open }">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <router-link @click="hide(item)" :to="`/category/sub/${sub.id}`">
              <img :src="sub.picture" alt="" />
              <p>{{ sub.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    // 拿到vuex中分类列表

    const list = computed(() => {
      return store.state.category.list;
    });

    // 跳转的时候不会关闭二级类目，通过数据来控制
    // 1.vuex每个分类加上open函数
    // 2.vuex提供显示和隐藏函数，修改open数据
    // 3.在组件中使用vuex中的函数,使用时间来绑定，提供一个类名显示隐藏类名
    const show = (item) => {
      store.commit("category/show", item.id); //传分类id
    };
    const hide = (item) => {
      store.commit("category/hide", item.id); //传分类id
    };

    return {
      list,
      show,
      hide,
    };
  },
};
</script>

<style lang="less" scoped>
.app-header-nav {
  position: relative;
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      // 显示二级类名
      // > .layer {
      //   height: 132px;
      //   opacity: 1;
      // }
    }
  }
}
// 二级类名弹层
.layer {
  // 用来控制显示的类名
  &.open {
    height: 132px;
    opacity: 1;
  }
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  z-index: 100;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
