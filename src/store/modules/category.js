/*
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-21 17:05:49
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-26 10:19:36
 */
// 分类模块
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'
export default {
    namespaced: true,
    state() {
        return {
            // 分类信息集合，依赖topCategory重新设置，保证初始化就有数据，不至于白屏
            list: topCategory.map(item => ({
                name: item
            }))
        }
    },
    // 获取分类函数
    actions: {
        async getList({ commit }) {
            // 获取分类数据
            const data = await findAllCategory()

            // 2、给每个分类加上控制二级分类显示隐藏的数据 默认false
            data.result.forEach(top => {
                top.open = false
            });
            // 修改分类数据
            commit('setList', data.result)
        }
    },
    // 修改分类函数
    mutations: {
        // payload 所有的分类集合
        setList(state, payload) {
            state.list = payload
        },
        // 2、定义show和hide函数，控制当前分类的二级分类显示和隐藏
        show(state, id) {
            const currCategory = state.list.find(item => item.id === id) //找到当前分类的id
            currCategory.open = true //设置显示
        },
        hide(state, id) {
            const currCategory = state.list.find(item => item.id === id) //找到当前分类的id
            currCategory.open = false //设置隐藏
        }

    },

}