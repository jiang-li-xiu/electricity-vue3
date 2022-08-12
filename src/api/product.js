/*
 * @Author: jiang-li-xiu 2663282851@qq.com
 * @Date: 2022-08-07 15:00:23
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-12 15:16:38
 * @FilePath: \electricity-vue3\src\api\product.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 提供商品相关的API函数

import request from "@/utils/request";

/**
 * 获取商品详情
 * @param {*} id  商品ID
 */
export const findGoods = (id) => {
    return request('/goods', 'get', { id })
}

/**
 * 获取相关推荐商品
 * @param {String} id -商品id 传入相关推荐，不传猜你喜欢
 * @param {Integer} limit 商品数量
 */
export const findRelevantGoods = ({ id, limit = 16 }) => {
    return request('/goods/relevant', 'get', { id, limit })
}

/**
 * 获取热销榜数据
 * @param {String} id -商品id
 * @param {Integer} limit 商品数量
 * @param {Integer} type 热销类型 1为24小时，2：周榜，3：总榜 默认1
 */
export const findGoodsHot = ({ id, limit = 3, type = 1 }) => {
    return request('/goods/hot', 'get', { id, limit, type })
}

/**
 * 查询商品评价信息
 * @param {String} id -商品id
 */
export const findGoodsCommentInfo = (id) => {
    return request(`/goods/${id}/evaluate`, 'get')

    // axios 遇见http https 开头的地址，不会加上基准地址
    // return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}