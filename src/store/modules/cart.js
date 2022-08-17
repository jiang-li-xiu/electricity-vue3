/*
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-21 17:05:39
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-17 17:43:34
 */

import { getNewCartGoods } from "@/api/cart"

// 购物车模块
export default {
    namespaced: true,
    state() {
        return {
            // 购物车商品列表
            list: []
        }
    },
    mutations: {
        // ***加入购物车****
        // 约定加入购物车字段 和后端保持一致 payload对象字段
        // 字段：id skuId name attrsText picture price nowPrice selected stock count isEffective
        insertCart(state, payload) {
            // 插入数据规则：
            // 1. 先找看是否有相同商品
            // 2. 如果有相同的商品 查询它的数量 累加到payload上 再保存到最新位置,原来的商品需要先删除
            // 3. 如果没有相同的商品，保存在最新位置即可
            const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId) //相同的索引
            if (sameIndex > -1) {
                // 找到了相同商品
                const count = state.list[sameIndex].count //数量
                    // 累加之前数量
                payload.count += count
                    // 删除原来
                state.list.splice(sameIndex, 1)
                    // 追加新的
                state.list.unshift(payload)
            } else {
                // 直接追加新的
                state.list.unshift(payload)
            }
        },
        // **修改购物车商品
        updateCart(state, goods) {
            // goods 商品信息：nowPrice, stock, isEffective
            // goods 商品对象字段不固定 对象中有哪些字段就改哪些字段，字段值合理才改 但是必须有skuId
            const updateGoods = state.list.find(item => item.skuId === goods.skuId) //拿到要改的商品
            for (const key in goods) {
                if (goods[key] !== undefined && goods[key] !== '') {
                    updateGoods[key] = goods[key]
                }
            }
        },
        // **删除购物车商品
        deleteCart(state, skuId) {
            // 根据skuId删除
            const index = state.list.findIndex(item => item.skuId === skuId)
            state.list.splice(index, 1)
        }

    },
    actions: {
        // **加入购物车 ctx当前模块的状态 payload商品信息 ctx.rootState所有状态
        insertCart(ctx, payload) {
            // 区分已登录未登录
            return new Promise((resolve, reject) => {
                // 登录 获取user模块的token信息判断
                if (ctx.rootState.user.profile.token) {
                    // TODO 已登录

                } else {
                    // 未登录
                    ctx.commit('insertCart', payload) //触发mutation的insertCart方法
                    resolve()
                }

            })
        },
        // **获取商品列表(本地才要，登录了的话后台会返回)
        findCart(ctx) {
            return new Promise((resolve, reject) => {
                // 获取user模块的token信息判断
                if (ctx.rootState.user.profile.token) {
                    // TODO 已登录
                } else {
                    // 未登录
                    // 同时发生请求（有几个商品发几个请求）等所有请求成功，一并修改本地数据
                    // Promise.all(promise数组).then((dataList)=>{}) 同时发请求 所有请求成功 得到所有成功的数据
                    // Promise.resolve() Promise.reject() new Promise()
                    // Promise.race(promise数组).then((data)=>{}) 同时发请求 最快的请求成功，得到成功结果
                    const promisrArr = ctx.state.list.map(goods => {
                            return getNewCartGoods(goods.skuId)
                        })
                        // results成功结果集合 数据顺序和PromiseArr顺序一致，它是根据state.list而来
                    Promise.all(promisrArr).then(results => {
                        // console.log(results);
                        // 更新本地购物车
                        results.forEach((data, index) => {
                                ctx.commit('updateCart', { skuId: ctx.state.list[index].skuId, ...data.result })
                            })
                            // 调用resolve
                        resolve()
                    })

                }
            })
        },
        // **删除购物车
        deleteCart(ctx, payload) {
            // 单条删除 payload 现在就是skuId
            return new Promise((resolve, reject) => {
                if (ctx.rootState.user.profile.token) {
                    // TODO 已登录
                } else {
                    // 未登录
                    ctx.commit('deleteCart', payload) //触发mutation的deleteCart方法
                    resolve()
                }

            })
        },
        // 修改购物车（选中状态，数量）
        updateCart(ctx, payload) {
            // payload 需要：必须skuId 可能：修改的状态 selected/count
            return new Promise((resolve, reject) => {
                if (ctx.rootState.user.profile.token) {
                    // TODO 已登录
                } else {
                    // 未登录
                    ctx.commit('updateCart', payload) //触发mutation的deleteCart方法
                    resolve()
                }

            })
        },
        // **全选和取消全选
        checkAllCart(ctx, selected) {
            return new Promise((resolve, reject) => {
                if (ctx.rootState.user.profile.token) {
                    // TODO 已登录
                } else {
                    // 未登录
                    ctx.commit('updateCart', selected) //触发mutation的deleteCart方法
                    resolve()
                }
            })
        }
    },
    getters: {
        // 有效商品列表
        validList(state) {
            // 有效商品：库存stock大于0  商品有效标识isEffective为true
            return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
        },
        // **有效商品总件数 (拿有效商品列表做处理) 
        // TODO 可以拿当前模块getters
        validTotal(state, getters) {
            // 数量累加
            return getters.validList.reduce((p, c) => p + c.count, 0)
        },
        // 有效商品总金额
        validAmount(state, getters) {
            return getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
        },

        // **无效商品列表
        inValidList(state) {
            return state.list.filter(goods => goods.stock <= 0 || !goods.isEffective)
        },
        // 已选商品列表
        selectedList(state, getters) {
            return getters.validList.filter(item => item.selected)
        },
        // 已选商品件数
        selectedTotal(state, getters) {
            // 数量累加
            return getters.selectedList.reduce((p, c) => p + c.count, 0)
        },
        // 已选商品总金额
        selectedAmount(state, getters) {
            return getters.selectedList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
        },
        // 是否全选
        isCheckAll(state, getters) {
            // 已选商品列表=有效商品列表  代表全选
            return getters.validList.length !== 0 && getters.selectedList.length === getters.validList.length
        }
    }
}