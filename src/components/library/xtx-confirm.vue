<!--
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-08-18 09:49:12
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-18 14:34:43
-->
<template>
  <div class="xtx-confirm" :class="{ fade }">
    <div class="wrapper" :class="{ fade }">
      <!-- 标题 -->
      <div class="header">
        <h3>{{ title }}</h3>
        <a @click="cancel" href="JavaScript:;" class="iconfont icon-guanbi"></a>
      </div>
      <!-- 提示内容 -->
      <div class="body">
        <i class="iconfont icon-icon--jinggao"></i>
        <span>{{ text }}</span>
      </div>
      <div class="footer">
        <XtxButton @click="cancel" size="mini" type="gray">取消</XtxButton>
        <XtxButton @click="submit" size="mini" type="primary">确认</XtxButton>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import XtxButton from "./xtx-button.vue";
export default {
  name: "XtxConfirm",
  components: { XtxButton },
  props: {
    title: {
      type: String,
      default: "温馨提示",
    },
    text: {
      type: String,
      default: "",
    },
    cancelCallback: {
      type: Function,
    },
    submitCallback: {
      type: Function,
    },
  },
  setup(props) {
    // 对话框默认隐藏
    const fade = ref(false);
    //组件渲染完毕后
    onMounted(() => {
      // 过渡效果需要在元素创建完毕后延时一会才触发
      setTimeout(() => {
        fade.value = true;
      }, 0);
    });

    // 取消
    const cancel = () => {
      // visible.value = false;
      props.cancelCallback();
    };
    // 确认
    const submit = () => {
      // visible.value = false;
      props.submitCallback();
    };

    return {
      fade,
      cancel,
      submit,
    };
  },
};
</script>
<style scoped lang="less">
.xtx-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  // background: rgba(0, 0, 0, 0.5);
  /**加个动画 start */
  background: rgba(0, 0, 0, 0);
  &.fade {
    transition: all 0.4s;
    background: rgba(0, 0, 0, 0.5);
  }
  /**加个动画 end*/
  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    // transform: translate(-50%, -50%);
    /**加个动画 start */
    transform: translate(-50%, -60%); //滑下
    opacity: 0; //淡入
    &.fade {
      transition: all 0.4s;
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    /**加个动画 end*/
    .header,
    .footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-icon--jinggao {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: right;
      .xtx-button {
        margin-left: 20px;
      }
    }
    .header {
      position: relative;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
