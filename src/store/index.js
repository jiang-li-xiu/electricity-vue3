/*
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-21 15:11:37
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-22 09:14:46
 */
import { createStore } from 'vuex'

import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'


/**
 * vuex持久化 
 *  1.安装npm install vuex-persistedstate --save
 *  2.使用 
 */

export default createStore({
    modules: {
        cart,
        category,
        user,
    }
})

// 2.0 new Vuex.Store({})
// 3.0 createStore({})

// 2.分模块
// A模块
// const moduleA = {
//         state: {
//             userName: 'moduleA'
//         },
//         getters: {
//             newName(state) {
//                 return state.userName + '!!'
//             }
//         },
//     }
// B模块
// const moduleB = {
//     // 开启命名空间
//     namespaced: true,
//     state: {
//         userName: 'moduleB'
//     },
//     getters: {
//         newName(state) {
//             return state.userName + '!!'
//         }
//     },
//     mutations: {
//         // commit调用
//         updateName(state) {
//             state.userName = 'ls'
//         }
//     },
//     actions: {
//         updateName(ctx) {
//             // 发请求 处理逻辑 用dispatch调用
//             setTimeout(() => {
//                 ctx.commit('updateName')
//             }, 1000)
//         }
//     },
// }
// export default createStore({
//     modules: {
//         moduleA,
//         moduleB,
//     }
// })


// 1.不分模块
// export default createStore({
//     state: {
//         username: 'zs'
//     },
//     getters: {
//         newName(state) {
//             return state.username + '!!'
//         }
//     },
//     mutations: {
//         // commit调用
//         updateName(state) {
//             state.username = 'ls'
//         }
//     },
//     actions: {
//         updateName(ctx) {
//             // 发请求 处理逻辑 用dispatch调用
//             setTimeout(() => {
//                 ctx.commit('updateName')
//             }, 1000)
//         }
//     },
//     modules: {}
// })