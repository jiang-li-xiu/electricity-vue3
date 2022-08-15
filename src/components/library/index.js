/*
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-26 15:04:19
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-15 14:42:45
 */
// 插件：扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，vue3没有全局过滤器

// vue2.0插件写法：导出一个对象，有install函数，默认传入了vue构造函数，在vue基础之上扩展
// vue3.0插件写法:导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

/**
 *  记得在mian.js使用这个插件!!!
 */
// 默认图片
import defaultImg from '@/assets/images/src.jpg'

// 
import Message from './Message';

//            -----1.传统方法start-------
// // 骨架组件
// import XtxSkeketon from './xtx-skeleton.vue'
// // 轮播组件
// import XtxCarousel from './xtx-carousel.vue'
// // 查看更多组件
// import XtxMore from './xtx-more'
// // 面包屑组件
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item'
//             -----传统方法end-------


/**           -------2. 批量注册组件方法--------
 * 使用 require 提供的函数 context 加载某一个目录下的所有 .vue 后缀的文件。
  然后 context 函数会返回一个导入函数 importFn
  它有一个属性 keys() 获取所有的文件路径
  通过文件路径数组，通过遍历数组，再使用 importFn 根据路径导入组件对象
  遍历的同时进行全局注册即可
 */

// context(目录路径, 是否加载了目录, 加载文件的匹配正则) 
const importFn = require.context('./', false, /\.vue$/) //加载后缀是.vue的文件
    // console.log(importFn.keys());

//            -------批量注册组件end--------

export default {
    install(app) {
        // 在app上进行扩展，app提供 component diretive(指令) 函数
        // 如果要挂载原型 app.config.globalProperties 方式
        //            -----传统方法-------
        // app.component(XtxSkeketon.name, XtxSkeketon)
        // app.component(XtxCarousel.name, XtxCarousel)
        // app.component(XtxMore.name, XtxMore)
        // app.component(XtxBread.name, XtxBread)
        // app.component(XtxBreadItem.name, XtxBreadItem)
        //            -----传统方法end------


        // -------2. 批量注册组件方法--------
        // 根据keys批量注册
        importFn.keys().forEach(path => {
            // 导入组件
            const component = importFn(path).default
                // 进行注册
            app.component(component.name, component)
        });

        // -------2. 批量注册组件方法--------

        // 定义指令(扩展)
        defineDirective(app)

        // 定义一个原型函数
        app.config.globalProperties.$message = Message
    }
}

// 定义指令(自定义)
/**
 * 自定义图片懒加载指令 v-lazy
 * @param {*} app 扩展指令
 */
const defineDirective = (app) => {
    // 1. 图片懒加载指令 v-lazy
    // 原理: 先存储图片地址,不能在src上,当图片进入可视区,将已存储的src地址 *设置给图片元素*(操作dom) 即可
    app.directive('lazy', {
        // vue2.0 监听使用指令的dom是否创建好,钩子函数:inserted
        // vue3.0 的指令拥有的钩子函数和组件一样,使用指令的dom是否创建好,钩子函数:mounted
        mounted(el, binding) { //el 观察的元素
            //  2. 创建一个观察对象,来观察当前使用指令的元素
            const observe = new IntersectionObserver(([{ isIntersecting }]) => {
                    // 进入可视区
                    if (isIntersecting) {
                        // 停止观察
                        observe.unobserve(el)

                        // 3. 把指令的值设置给el的src属性 binding.value就是指令的值
                        // 4. 处理图片加载失败 onerror-图片加载失败事件 load-图片加载成功事件
                        el.onerror = () => {
                            // 加载失败,设置默认图
                            el.src = defaultImg
                        }
                        el.src = binding.value
                    }
                }, {
                    // 配置项
                    threshold: 0
                })
                // 使用observe方法观察 el元素
                // 开启观察
            observe.observe(el)
        }

    })
}

// 原生的 IntersectionObserver 观察方法
// 创建观察对象实例
// const observer = new IntersectionObserver(callback[options])
// callback 被观察dom进入可视区离开可视区都会触发
// - 两个回调参数 entries , observer
// - entries 被观察的元素信息对象的数组 [{元素信息},{}]，信息中isIntersecting判断进入或离开
// - observer 就是观察实例
// options 配置参数
// - 三个配置属性 root rootMargin threshold
// - root 基于的滚动容器，默认是document
// - rootMargin 容器有没有外边距
// - threshold 交叉的比例

// 实例提供两个方法
// observe(dom) 观察哪个dom
// unobserve(dom) 停止观察那个dom