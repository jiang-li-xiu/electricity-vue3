/*
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-25 10:25:32
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-25 10:28:22
 */
// 定义分类相关API接口函数

import request from "@/utils/request";

/**
 * 获取所有分类（顶级，二级，对应商品推荐数据）
 * @returns Promise
 */
export const findAllCategory = () => {
    return request('/home/category/head', 'get')
}