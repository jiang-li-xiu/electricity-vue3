/*
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-21 17:05:39
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-16 17:46:55
 */
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
        }
    }
}