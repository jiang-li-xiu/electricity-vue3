<!--
 * @Author: jiang-li-xiu 2663282851@qq.com
 * @Date: 2022-08-14 14:11:33
 * @LastEditors: jiang-li-xiu 2663282851@qq.com
 * @LastEditTime: 2022-08-14 17:29:02
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
            <span class="code">发送验证码</span>
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
    <XtxMessage type="success" :text="不存在"></XtxMessage>
  </div>
</template>
<script>
import { reactive, ref, watch } from "vue";
// 导入校验插件
import { Form, Field } from "vee-validate";
// 封装的校验组件
import schema from "@/utils/vee-validate-schema";
import XtxMessage from "@/components/library/xtx-message.vue";
export default {
  name: "LoginForm",
  components: {
    Form,
    Field,
    XtxMessage,
  },
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
    const login = async () => {
      // Form组件提供了一个validate 函数作为整体表单校验，返回的是Promise
      // true 通过
      const valid = await formCom.value.validate();
    };

    return {
      isMsgLogin,
      form,
      schema: mySchema,
      formCom,
      login,
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