<!--
 * @Author: jiang-li-xiu 2663282851@qq.com
 * @Date: 2022-08-13 15:23:39
 * @LastEditors: jiang-li-xiu 2663282851@qq.com
 * @LastEditTime: 2022-08-13 20:33:03
 * @Description: 分页组件
-->
<template>
  <div class="xtx-pagination">
    <!-- 当前页大于1 才可点上一页 disabled禁用-->
    <a
      v-if="myCurrentPage > 1"
      @click="changePager(myCurrentPage - 1)"
      href="javascript:;"
      >上一页
    </a>
    <a v-else href="javascript:;" class="disabled">上一页</a>
    <span v-if="pager.start > 1">...</span>
    <a
      v-for="i in pager.btnArr"
      :key="i"
      @click="changePager(i)"
      href="javascript:;"
      :class="{ active: i === myCurrentPage }"
    >
      {{ i }}
    </a>
    <span v-if="pager.end < pager.pageCount">...</span>
    <!-- 当前页小于总页数 -->
    <a
      v-if="myCurrentPage < pager.pageCount"
      @click="changePager(myCurrentPage + 1)"
      href="javascript:;"
      >下一页
    </a>
    <a v-else href="javascript:;" class="disabled">下一页</a>
  </div>
</template>
<script>
import { computed, ref, watch } from "vue";
export default {
  name: "XtxPagination",
  props: {
    // 总条数
    total: {
      type: Number,
      default: 100,
    },
    // 页条数
    pageSize: {
      type: Number,
      default: 10,
    },
    // 当前页数
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  setup(props,{emit}) {
    // 需要数据：
    // 1. 约定按钮的个数 5个  如果成为动态的需要设置响应式数据
    const count = 5;
    // 2. 当前显示的页码 默认第一页
    let myCurrentPage = ref(1);
    // 3. 总页数 = 总条数 / 每页条数 向上取整
    let myTotal = ref(100);
    let myPageSize = ref(10);

    // 其他数据（总页数，起始按钮，结束按钮，按钮数组）依赖上面数据得到
    const pager = computed(() => {
      // 总页数
      const pageCount = Math.ceil(myTotal.value / myPageSize.value);
      // 按钮个数和当前页码 ==> 起始按钮，结束按钮，按钮数组
      // 1. 理想情况下：
      const offset = Math.floor(count / 2); //当前偏移 向下取整
      //  推第一个
      let start = myCurrentPage.value - offset;
      //   比如当前是5 开始是3 当前页码就是5+3-1 = 7  （34567）
      let end = start + count - 1;
      //   2. 如果起始页码小于0，
      if (start < 1) {
        start = 1;
        // 最后页码是否大于总页码 如果大于总页数，不合理，那就只能等于总页数
        end = start + count - 1 > pageCount ? pageCount : start + count - 1;
      }
      // 3.结束页码不对 如果结束页码大于总页数
      if (end > pageCount) {
        end = pageCount;
        // 当前第8页 往前推5 当前3不对 所以+1  （45678）
        start = end - count + 1 < 1 ? 1 : end - count + 1;
      }
      // 按钮数组
      const btnArr = [];
      for (let i = start; i <= end; i++) {
        btnArr.push(i);
      }
      //   提供计算属性
      //   console.log(btnArr);
      return {
        pageCount,
        btnArr,
        start,
        end,
      };
    });

    // 监听props的变化，更新组件内部数据
    watch(
      props,
      () => {
        myTotal = props.total;
        myPageSize = props.pageSize;
        myCurrentPage = props.currentPage;
      },
      { immediate: true }
    );

    // 切换分页的函数
    const changePager = (page) => {
      myCurrentPage.value = page;
      emit("current-page", page);
    };

    return {
      myCurrentPage,
      pager,
      changePager,
    };
  },
};
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>