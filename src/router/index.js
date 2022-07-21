import { createRouter, createWebHashHistory } from 'vue-router'

// vue2.0 new VueRouter({}) 创建路由实例
// vue3.0 createRouter({})

const routes = []

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router