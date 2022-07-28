/*
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-21 15:11:37
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-22 17:40:29
 */
const { defineConfig } = require('@vue/cli-service')

const path = require('path')

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,

    // less自动化导入：安装 vue add style-resources-loader
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            //  哪些文件 自动引入，使用绝对路径
            // 需要是path.join来拼接完整路径
            patterns: [
                path.join(__dirname, './src/assets/styles/variables.less'),
                path.join(__dirname, './src/assets/styles/mixins.less')
            ]
        }
    }
})