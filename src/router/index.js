/*
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-21 15:11:37
 * @LastEditors: jiang-li-xiu 2663282851@qq.com
 * @LastEditTime: 2022-08-13 20:53:56
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () =>
    import('@/views/Layout')
const Home = () =>
    import('@/views/home')
const topCategory = () =>
    import('@/views/category/index.vue')
const subCategoory = () =>
    import('@/views/category/sub.vue')
const Goods = () =>
    import('@/views/goods')
const Login = () =>
    import('@/views/login/index.vue')

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
            { path: '/product/:id', component: Goods },
        ]
    },
    {
        path: '/login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    // 每次切换路由滚动到页面顶部
    scrollBehavior() {
        return { left: 0, top: 0 }
    }
    /**
     * vue2.0通过x和y控制
     * scrollBehavior() {
        return { x: 0, y: 0 }
        }
     */

})

export default router