<!--
 * @Descripttion: 面包屑组件
 * @Author: JLX
 * @Date: 2022-07-28 10:33:02
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-28 15:08:34
-->
<!-- <template>
  <div class="xtx-bread">
    <slot></slot>
  </div>

  <!~~  <div class="xtx-bread">
    <div class="xtx-bread-item">
      <RouterLink to="/">首页</RouterLink>
    </div>
    <i class="iconfont icon-xiangyou1"></i>
    <!~~ 一级类目 ~~>
    <div class="xtx-bread-item" v-if="parentName">
      <RouterLink v-if="parentPath" :to="parentPath">
        {{ parentName }}
      </RouterLink>
      <span v-else>{{ parentName }}</span>
    </div>
    <i v-if="parentName" class="iconfont icon-xiangyou1"></i>
    <!~~ 二级类 ~~>
    <div class="xtx-bread-item">
      <!~~ 插槽显示二级类目名称 ~~>
      <span><slot></slot></span>
    </div>
  </div> ~~>
</template> -->

<script>
// 1.  导入h 进来
import { h } from "vue";
export default {
  name: "XtxBread",
  render() {
    /**
     * 用法
     * 1. template标签去掉,单文件组件
     * 2. 返回值就是组件内容
     * 3. vue2.0 的h函数传参进来的,vue3.0 的h函数导入进来的
     * 4. h  第一个参数:标签名字; 第二个: 标签属性对象;  第三: 子节点
     */
    // 返回值就是组件的内容

    // 需求: 1.创建xtx-bread父容器
    // 2. 获取默认插槽内容
    // 3. 去掉xtx-bread-item组件的i标签 由render函数来创建
    // 4. 遍历插槽中的item, 得到一个动态创建的节点,最后一个item不加i标签
    // 5. 把动态创建好的节点,渲染在xtx-bread 标签中

    // $slots.default 获取默认插槽内容
    const items = this.$slots.default();
    const dymanciItem = []; //动态数组
    // 往插槽里面添加
    items.forEach((item, i) => {
      dymanciItem.push(item);
      // 最后一个不加i
      if (i < items.length - 1) {
        dymanciItem.push(h("i", { class: "iconfont icon-xiangyou1" }));
      }
    });
    return h("div", { class: "xtx-bread" }, dymanciItem);
  },
};
</script>

// 去除scoped属性,让样式作用到txt-bread-item 组件
<style lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  // ul li:last-child{}
  // 先找到父元素,找到所有子元素,找到最后一个,判断是不是li,是就是选中,不是就是无效选择器
  // ul li:last-of-type{}
  // 先找到父元素,找到所有类型为li的元素,选中最后一个
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    // 最后一个面包屑i标签不显示 >(样式的方式实现)
    &:last-child {
      display: none;
    }
  }
}
</style>
