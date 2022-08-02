/*
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-25 10:25:32
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-02 15:15:08
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

/**
 * 获取顶级类目信息（children属性就是各个子分类）
 * @returns Promise
 */
export const findTopCategory = (id) => {
    return request('/category', 'get', { id })
}

/**
 * 获取二级目录下的筛选数据
 * @returns {String} id
 */
export const findSubCategoryFilterData = (id) => {
    return request('/category/sub/filter', 'get', { id })
}