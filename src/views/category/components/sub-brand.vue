<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-08-02 14:38:09
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-02 15:03:36
-->
<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>

    <Transition name="fade-rigth">
      <!-- 面包屑一级 -->
      <XtxBreadItem
        v-if="category.top"
        :to="`/category/${category.top.id}`"
        :key="category.top.id"
      >
        {{ category.top.name }}
      </XtxBreadItem>
    </Transition>

    <Transition name="fade-rigth">
      <!-- 面包屑二级类目-->
      <XtxBreadItem v-if="category.sub" :key="category.sub.id">
        {{ category.sub.name }}
      </XtxBreadItem>
    </Transition>
  </XtxBread>
</template>

<script>
import XtxBread from "@/components/library/xtx-bread.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "SubBrand",
  components: { XtxBread },
  setup() {
    // 通过计算属性从vuex获取顶级和二级类目信息
    // 对象：{top:{id,name},sub:{id,name}}
    const route = useRoute(); //拿id
    const store = useStore();
    const category = computed(() => {
      const cate = {};
      // 完成获取数据逻辑
      store.state.category.list.forEach((top) => {
        if (top.children) {
          // 二级类目id
          const sub = top.children.find((sub) => sub.id === route.params.id);
          if (sub) {
            cate.top = { id: top.id, name: top.name };
            cate.sub = { id: sub.id, name: sub.name };
          }
        }
      });
      return cate;
    });

    return {
      category,
    };
  },
};
</script>

<style lang="less" scoped>
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
</style>
