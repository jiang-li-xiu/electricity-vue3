/*
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-21 15:11:37
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-16 09:33:10
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

    chainWebpack: config => {
        // 配置10kb下的图片打包成base64的格式
        // config.module
        //     .rule('images')
        //     .use('url-loader')
        //     .loader('url-loader')
        //     .tap(options => Object.assign(options, { limit: 10000 }))

        // 需要开启IP或域名访问webpack服务器权限，在vue.config.js中
        // 这个是给webpack-dev-server开启可IP和域名访问权限。
        // config.devServer.disableHostCheck(true)
    },
    configureWebpack: {
        devServer: {
            // disableHostCheck: true,
            allowedHosts: ['www.corho.com'] // 此处是要改变的域名
        }
    }
})