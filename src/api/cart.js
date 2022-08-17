/*
 * @Descripttion:  封装购物车相关API
 * @Author: JLX
 * @Date: 2022-08-17 09:58:37
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-17 10:01:58
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