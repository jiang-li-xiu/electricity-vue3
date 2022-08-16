<!--
 * @Author: jiang-li-xiu 2663282851@qq.com
 * @Date: 2022-08-14 14:11:33
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-16 16:32:21
 * @FilePath: \electricity-vue3\src\views\login\components\login-form.vue
 * @Description: 登录表单
-->
<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <!-- :validation-schema="schema"校验  v-slot="{ errors }"显示错误提示-->
    <Form
      ref="formCom"
      class="form"
      :validation-schema="schema"
      v-slot="{ errors }"
      autocomplete="off"
    >
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              v-model="form.account"
              name="account"
              :class="{ error: errors.account }"
              type="text"
              placeholder="请输入用户名"
            />
          </div>
          <!-- 显示错误信息 -->
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" /> {{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              v-model="form.password"
              name="password"
              :class="{ error: errors.password }"
              type="password"
              placeholder="请输入密码"
            />
          </div>
          <!-- 显示错误信息 -->
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" /> {{ errors.password }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              v-model="form.mobile"
              name="mobile"
              :class="{ error: errors.mobile }"
              type="text"
              placeholder="请输入手机号"
            />
          </div>
          <!-- 显示错误信息 -->
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" /> {{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              v-model="form.code"
              name="code"
              :class="{ error: errors.code }"
              type="password"
              placeholder="请输入验证码"
            />
            <span @click="send()" class="code">
              {{ time === 0 ? "发送验证码" : `${time}秒后发送` }}
            </span>
          </div>
          <!-- 显示错误信息 -->
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning" /> {{ errors.code }}
          </div>
        </div>
      </template>
      <!-- 勾选同意 -->
      <div class="form-item">
        <div class="agree">
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <!-- 显示错误信息 -->
        <div class="error" v-if="errors.isAgree">
          <i class="iconfont icon-warning" /> {{ errors.isAgree }}
        </div>
      </div>
      <a @click="login" href="javascript:;" class="btn">登录</a>
    </Form>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
    <!-- 测试 -->
    <!-- <XtxMessage type="success" text="不存在"></XtxMessage> -->
  </div>
</template>
<script>
// API
import {
  userAccountLogin,
  userMobileLoginMsg,
  userMobileLogin,
} from "@/api/user";
import { onUnmounted, reactive, ref, watch } from "vue";
// 导入校验插件
import { Form, Field } from "vee-validate";
// 封装的校验组件
import schema from "@/utils/vee-validate-schema";
// 组件
import XtxMessage from "@/components/library/xtx-message.vue";
import Message from "@/components/library/Message";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useIntervalFn } from "@vueuse/core";
export default {
  name: "LoginForm",
  components: {
    Form,
    Field,
    XtxMessage,
  },
  // vue2
  // created(){
  //   this.$message({type:'error',text:'用户名已存在'})
  // },
  setup() {
    // 切换登录 默认不是短信登录
    const isMsgLogin = ref(false);
    // 表单数据 对象
    const form = reactive({
      // 默认同意
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null,
    });

    /**
     * vee-validate 校验基本步骤
     * 1. 导入 Form Field 组件 将form input进行替换，需要加上name用来指定将来校验规则函数
     * 2. Field 需要进行v-model数据绑定, 字段名称和后台接口需要的一致
     * 3. 编写Field 的name属性对应的校验规则函数，用Form的:validation-schema接收定义好的校验规则是对象
     *4. 自定义组件需要校验必须先支持v-model，然后Filed使用as指定对应组件
     */
    const mySchema = {
      // 校验函数规则：返回true就是校验成功，返回一个字符串就是失败，字符串就是错误提示
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      isAgree: schema.isAgree,
    };

    // 监听isMsgLogin 切换了重置表单+销毁校验结果
    const formCom = ref(null); //ref='formCom'
    watch(isMsgLogin, () => {
      (form.isAgree = true),
        (form.account = null),
        (form.password = null),
        (form.mobile = null),
        (form.code = null);
      // 如果没有销毁Field组件，之前校验结果是不会销毁 例如；v-show
      // Form组件提供了一个resetForm函数清除校验结果
      formCom.value.resetForm();
    });

    // 需要在点击登录的时候对整体表单进行校验
    const store = useStore();
    const router = useRouter(); //路由方法
    const route = useRoute(); //拿路由信息

    const login = async () => {
      // Form组件提供了一个validate 函数作为整体表单校验，返回的是Promise
      // true 通过
      const valid = await formCom.value.validate();
      // Message({ type: "error", text: "用户名或密码错误" });
      if (valid) {
        // ***短信登录*** 13241051259/123456
        // 1. 发送验证码
        // 1.1 绑定发送验证码按钮点击事件
        // 1.2 校验手机号,如果成功才发送短信(定义API), 请求成功后开启60s倒计时, 倒计时过程不能再点击,倒计时过后恢复原样
        // 1.3 校验失败,失败的校验样式显示
        // 2. 进行手机号登录
        // 2.1. 准备一个API做手机号登录
        // 2.2. 调用API
        // 2.3. 成功，存储用户信息+跳转到来源页或者首页　＋　消息提示
        // 2.4. 失败：消息提示
        try {
          let data = null;
          if (isMsgLogin.value) {
            const { mobile, code } = form;
            data = await userMobileLogin({ mobile, code });
          }
          // ***账号登录***
          // 1. 准备一个API做账号登录
          // 2. 调用API
          // 3.　成功，存储用户信息+跳转到来源页或者首页　＋　消息提示
          // 4.　失败：消息提示
          else {
            const { account, password } = form;
            data = await userAccountLogin({ account, password });
            //   // 发起请求
            //   userAccountLogin({ account, password })
            //     .then((data) => {
            //       // 把这些数据给vuex 存储
            //       const { id, account, avatar, mobile, nickname, token } =
            //         data.result;
            //       store.commit("/user/setUser", {
            //         id,
            //         account,
            //         avatar,
            //         mobile,
            //         nickname,
            //         token,
            //       });
            //       // 进行跳转 跳转到之前的Url或首页
            //       router.push(route.query.redirectUrl || "/");
            //       // 成功消息提示
            //       Message({ type: "success", text: "登录成功" });
            //     })
            //     .catch((e) => {
            //       // 失败提示
            //       if (e.response.data) {
            //         Message({
            //           type: "error",
            //           text: e.response.data.message || "登录失败",
            //         });
            //       }
            //     });
          }
          // 把这些数据给vuex 存储
          const { id, account, avatar, mobile, nickname, token } = data.result;
          store.commit("user/setUser", {
            id,
            account,
            avatar,
            mobile,
            nickname,
            token,
          });
          // localStorage.setItem(
          //   "user",
          //   JSON.stringify({
          //     id,
          //     account,
          //     avatar,
          //     mobile,
          //     nickname,
          //     token,
          //   })
          // );
          // 进行跳转 跳转到之前的Url或首页
          router.push(route.query.redirectUrl || "/");
          // 成功消息提示
          Message({ type: "success", text: "登录成功" });
        } catch (e) {
          // 失败提示
          if (e.response.data) {
            Message({
              type: "error",
              text: e.response.data.message || "登录失败",
            });
          }
        }
      }
    };

    // 倒计时 pause:暂停 resume:开启
    // useIntervalFn(回调函数, 执行间隔, false:不立即开启)
    const time = ref(0);
    const { pause, resume } = useIntervalFn(
      () => {
        time.value--;
        if (time.value <= 0) {
          pause();
        }
      },
      1000,
      false
    );
    // 组件销毁 清除定时器
    onUnmounted(() => {
      pause();
    });
    // 发送验证码事件
    const send = async () => {
      // 校验当前手机号
      const valid = mySchema.mobile(form.mobile);
      if (valid === true) {
        // 通过
        // 没有倒计时才可以发送请求
        if (time.value === 0) {
          await userMobileLoginMsg({ mobile: form.mobile });
          Message({ type: "success", text: "发送成功" });
          // 开启短信倒计时
          time.value = 60;
          resume();
        }
      } else {
        // 失败, 使用vee的错误函数显示信息 setFieldError(字段名,错误信息)
        formCom.value.setFieldError("mobile", valid);
      }
    };

    /**
     * 初始化qq登录按钮
     * 1. 准备span有id
     * 2. 通过 QC.login({btnId:'qqLoginBtn'})
     */
    

    return {
      isMsgLogin,
      form,
      schema: mySchema,
      formCom,
      login,
      send,
      time,
    };
  },
};
</script>
<style lang="less" scoped>
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
