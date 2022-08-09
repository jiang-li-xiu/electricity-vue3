/*
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-21 15:11:37
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-08 14:06:52
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
    },
    // 配置10kb下的图片打包成base64的格式
    // chainWebpack: config => {
    //     config.module
    //         .rule('images')
    //         .use('url-loader')
    //         .loader('url-loader')
    //         .tap(options => Object.assign(options, { limit: 10000 }))
    // }
})