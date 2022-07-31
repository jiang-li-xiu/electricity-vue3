// 提供复用逻辑函数(钩子)

import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
/**
 * 数据懒加载函数
 * @param {Element} target 监听的目标元素 dom对象
 * @param {Function} apiFn api函数
 */
export const useLazyDate = (apiFn) => {
    // 保存api数据
    const result = ref([])
    const target = ref(null)

    // stop 停止观察
    const { stop } = useIntersectionObserver(
        // target 监听的目标元素
        target,
        ([{ isIntersecting }], observerElement) => {
            // isIntersecting 是否进入可视区
            if (isIntersecting) {
                console.log('进入可视区');
                // 如果已进入可视区 停止观察
                stop()

                // 调用API函数获取数据
                apiFn().then(data => {
                    // 请求回来的数据
                    result.value = data.result
                })
            }
        },
        // 配置选项
        {
            //只要相交的比例大于0 就触发
            threshold: 0
        }
    )
    return { result, target }
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