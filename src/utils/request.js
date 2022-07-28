/*
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-22 09:16:03
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-22 14:08:21
 */
// 1.创建一个新的axios实例
// 2.请求拦截器，如果有token进行头部携带
// 3.响应拦截器：1.过滤无效数据 2.处理token失效
// 4.导出一个函数 调用当前的axios实例发请求 返回值promise

import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { def } from '@vue/shared'

export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
    // axios 的一些配置，baseURL timeout
    baseURL,
    timeout: 5000
})

// 请求拦截器，如果有token进行头部携带
instance.interceptors.request.use(config => {
    // 拦截业务逻辑
    // 请求配置的修改
    // 如果本地有token就在头部携带
    // 1、获取用户信息对象
    const { profile } = store.state.user
        // 2、判断是否有token
    localStorage.setItem('profile.token', 2)
    console.log(profile.token);
    if (profile.token) {
        config.headers.Authorization = `Bearer${profile.token}`
    }
    return config
}, err => {
    return Promise.reject(err)
})

// 响应拦截器：1.过滤无效数据 2.处理token失效
// res => res.data 取出data数据，将来调用直接拿到后台数据
instance.interceptors.response.use(res => res.data, err => {
    // 401状态码，进入该函数
    if (err.response && err.response.status === 401) {
        // 1、清空无效用户信息
        // 2、跳转到登录页码
        // 3、跳转需要传参（当前路由地址）给登录页码
        store.commit('user/setUser', {})
            // 当前路由地址
            // 组件里头:$route.fullPath(完整地址)
            // js模块中: router.currentRoute.value.fullPath 就是当前路由地址 router.currentRoute是ref响应式数据
        const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)

        console.log(fullPath);
        //encodeURIComponent 转码
        router.push('/login?redirectUrl=' + fullPath)
    }
    return Promise.reject(err)
})

// 请求工具函数
export default (url, method, submitData) => {
    // 负责发请求,请求地址,请求方式,提交的数据
    return instance({
        url,
        method,
        // 1.如果是get请求 需要使用params来传递submitData  ?a=10&c=10
        // 2.如果不是get请求 需要使用data来传递submitData   请求体传参
        // const a ={name:100} a.name a['10>9?name':'age']
        // []设置一个动态的key,写js表达式,js表达式的执行结果当作key
        // method参数:get GET  Get 转换成小写再做判断
        [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
    })
}