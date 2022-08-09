<!--
 * @Descripttion: 选择地址城市
 * @Author: JLX
 * @Date: 2022-08-08 10:10:00
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-08 17:23:44
-->
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: visible }">
      <span v-if="!fullLocation" class="placeholder">请选择配送地址</span>
      <!-- 将来选择地址的真正的值 -->
      <span v-else class="value">{{ fullLocation }}</span>
      <i class="iconfont icon-xuanze-duoxuan-tianchong"></i>
    </div>
    <div class="option" v-if="visible">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <!-- 省市数据 -->
        <span
          @click="changeItem(item)"
          class="ellipsis"
          v-for="item in currList"
          :key="item.code"
        >
          {{ item.name }}
        </span>
      </template>
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref } from "vue";
import axios from "axios";
import { onClickOutside } from "@vueuse/core";
export default {
  name: "XtxCity",
  props: {
    fullLocation: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    // 控制显示隐藏城市数据
    const visible = ref(false);

    // 所有省市区数据
    const allCityData = ref([]);
    // 加载状态
    const loading = ref(false);
    // 提供打开和关闭的函数
    const open = () => {
      // 显示
      visible.value = true;
      loading.value = true;
      // 打开弹窗获取城市地区数据
      getCityData().then((data) => {
        allCityData.value = data; // 所有省市区数据
        loading.value = false;
      });
      // 清空之前的选择所有字段值
      for (const key in changeResult) {
        changeResult[key] = "";
      }
    };
    const close = () => {
      visible.value = false;
    };
    // 提供一个切换函数给select使用
    const toggle = () => {
      // 打开/关闭
      visible.value ? close() : open();
    };
    // 实现点击组件外部元素进行 关闭操作 (vueuse onclickoutside)
    const target = ref(null);
    onClickOutside(target, () => {
      // 参数一：target监听哪个元素 参数二： 点击元素外的其他地方触发的函数
      // console.log('object');
      close();
    });

    // 实现计算属性：获取当前显示的地区列表数组
    const currList = computed(() => {
      // 默认找省一级
      let list = allCityData.value;
      // 市一级
      if (changeResult.provinceCode && changeResult.provinceName) {
        // 找到省 拿到省下面的市 areaList
        list = list.find((p) => p.code === changeResult.provinceCode).areaList;
      }
      // 可能：县地区一级 证明选了市
      if (changeResult.cityCode && changeResult.cityName) {
        // 当前选择的市 拿县级地区
        list = list.find((c) => c.code === changeResult.cityCode).areaList;
      }

      return list;
    });

    // 定义选择的 省市区 数据
    const changeResult = reactive({
      provinceCode: "",
      provinceName: "",
      cityCode: "",
      cityName: "",
      countyCode: "",
      countyName: "",
      fullLocation: "",
    });
    // 当点击按钮的时候记录
    const changeItem = (item) => {
      if (item.level === 0) {
        // 省级
        changeResult.provinceCode = item.code;
        changeResult.provinceName = item.name;
      }
      if (item.level === 1) {
        // 市级
        changeResult.cityCode = item.code;
        changeResult.cityName = item.name;
      }
      if (item.level === 2) {
        // 地区
        changeResult.countyCode = item.code;
        changeResult.countyName = item.name;
        // 拼接
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`;
        // 选择完了最后一级 通知父组件，关闭对话框
        close();

        emit("change", changeResult);
      }
    };

    return {
      visible,
      toggle,
      target,
      loading,
      currList,
      changeItem,
    };
  },
};
// 获取省市区数据函数
/**
 * 数据：https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
 * 1. 当本地没有缓存，发请求获取数据
 * 2. 当本地有缓存，取出本地数据
 * 返回一个Promise 在then获取数据，这里可能是异步操作 可能是同步操作
 */
const getCityData = () => {
  return new Promise((resolve, reject) => {
    // 约定：数据存储在window上的cityData字段
    if (window.cityData) {
      //1.本地有缓存 window.cityData有值
      resolve(window.cityData);
    } else {
      // 没有数据 发请求拿
      const url =
        "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json";
      axios.get(url).then((res) => {
        // 缓存
        window.cityData = res.data;
        // 成功
        resolve(res.data);
      });
    }
  });
};
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/load.jpg) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
