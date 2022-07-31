/*
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-21 15:11:37
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-26 10:08:46
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () =>
    import ('@/views/Layout')
const Home = () =>
    import ('@/views/home')
const topCategory = () =>
    import ('@/views/category/index.vue')
const subCategoory = () =>
    import ('@/views/category/sub.vue')

// vue2.0 new VueRouter({}) 创建路由实例
// vue3.0 createRouter({})

const routes = [
    // 一级路由布局容器
    {
        path: '/',
        component: Layout,
        children: [
            { path: '/', component: Home },
            { path: '/category/:id', component: topCategory },
            { path: '/category/sub/:id', component: subCategoory },
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router