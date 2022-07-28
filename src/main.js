/*
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-21 15:11:37
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-26 15:14:20
 */
import { createApp } from 'vue'
import App from './App.vue'
import '../public/font/iconfont.css'
import router from './router'
import store from './store'

// 导入自己的UI组件库
import UI from '@/components/library'

// 1、重置样式的库
import 'normalize.css'
// 2、自己项目的重置样式和公用样式
import '@/assets/styles/common.less'

createApp(App).use(store).use(router).use(UI).mount('#app')