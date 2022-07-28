<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-22 17:50:21
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-22 18:03:30
-->
<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 如果有token 显示这里 -->
        <template v-if="profile.token">
          <li>
            <a href="javascript:;"
              ><i class="iconfont icon-user"></i>{{ profile.account }}</a
            >
          </li>
          <li><a href="javascript:;">退出登录</a></li>
        </template>

        <!-- 否则先登录 -->
        <template v-else>
          <li><a href="javascript:;">请先登录</a></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  name: "AppTopnav",
  setup() {
    // 获取用户当前登录信息 才能控制切换导航菜单
    const store = useStore();
    // const { profile } = store.state.user;
    // 使用vuex中的state需要设置计算属性
    const profile = computed(() => {
      return store.state.user.profile;
    });
    return {
      profile,
    };
  },
};
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
// ~选择器作用:选择当前选择器后所有的元素 第一个li后其他li加上border
</style>
