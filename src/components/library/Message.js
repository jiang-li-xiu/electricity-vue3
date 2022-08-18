/*
 * @Descripttion: 调用xtx-message的函数
 * @Author: JLX
 * @Date: 2022-08-15 14:21:05
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-18 14:11:59
 */


// 提供一个能够显示xtx-message组件的函数
// 这个函数将来：导入直接使用，也可以挂载在vue实例原型上
// 目标使用方式：
// import Message from 'Message.js' Message({type:'error',text:'提示文字'})
// this.$message({type:'error',text:'提示文字'})

import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message.vue' //1.

// DOM容器
const div = document.createElement('div') //3.
div.setAttribute('class', 'xtx-message-container') //标识一下
document.body.appendChild(div) //追加到body

// 定时器标识
let timer = null

export default ({ type, text }) => {
    // 渲染组件
    // 1. 导入消息提示组件
    // 2. 把消息提示组件解析成dom （在vue里是单文件组件 不是dom）
    // createVNode(组件, 属性对象(props)) 根据组件创建虚拟节点
    const vnode = createVNode(XtxMessage, { type, text })

    // 3. 准备一个装载消息提示组件的DOM容器

    // 4. 将虚拟节点渲染在容器中 
    // 4.1 render(虚拟节点，DOM容器)
    render(vnode, div)

    // 5. 3s后销毁组件
    clearTimeout(timer)
    timer = setTimeout(() => {
        render(null, div)
    }, 3000)
}