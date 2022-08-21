/*
 * @Descripttion:  封装购物车相关API
 * @Author: JLX
 * @Date: 2022-08-17 09:58:37
 * @LastEditors: jiang-li-xiu 2663282851@qq.com
 * @LastEditTime: 2022-08-21 16:19:32
 */
//
import request from "@/utils/request";

/**
 * 获取商品的 最新价格 库存 是否有效
 * @param {String} skuId 
 * @returns 
 */
export const getNewCartGoods = (skuId) => {
    return request(`/goods/stock/${skuId}`, 'get')
}

/**
 * 获取商品对应的sku数据
 * @param {String} skuId 
 * @returns 
 */
export const getGoodsSku = (skuId) => {
    return request(`/goods/sku/${skuId}`, 'get')
}

/**
 * 合并购物车
 * @param {array<object>} cartList -购物车信息 
 * @param {String} object.skuId 
 * @param {Boolean} object.selected 
 * @param {Integer} object.count 
 * @returns 
 */
export const mergeCart = (cartList) => {
    return request('/member/cart/merge', 'post', cartList)
}