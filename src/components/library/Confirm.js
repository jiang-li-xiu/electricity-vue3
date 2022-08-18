// 提示框

import { createVNode, render } from 'vue'
import XtxConfirm from './xtx-confirm'

// 准备dom
const div = document.createElement('div') //3.
div.setAttribute('class', 'xtx-comfirm-container') //标识一下
document.body.appendChild(div) //追加到body

// 返回的时Promise对象，点取消和确认都要被销毁
export default ({ title, text }) => { //title, text参数
    // 1. 导入被创建的组件
    // 2. 使用createVNode创建虚拟节点
    // 3. 准备一个dom容器装载组件
    // 4. 使用render函数渲染组件


    // 点取消触发reject 点击确认触发resolve
    return new Promise((resolve, reject) => {
        // 将取消 确认的方法 传给组件 用props接收 type:Function
        // **点击取消触发的函数
        const cancelCallback = () => {
            render(null, div)
            reject(new Error('点击取消'))
        }

        // **点击确认触发的函数
        const submitCallback = () => {
            render(null, div)
            resolve()
        }

        const vn = createVNode(XtxConfirm, {
            title,
            text,
            cancelCallback,
            submitCallback
        })
        render(vn, div)
    })
}