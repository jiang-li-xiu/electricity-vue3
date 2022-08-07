/*
 * @Author: jiang-li-xiu 2663282851@qq.com
 * @Date: 2022-08-07 15:00:23
 * @LastEditors: jiang-li-xiu 2663282851@qq.com
 * @LastEditTime: 2022-08-07 15:02:17
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