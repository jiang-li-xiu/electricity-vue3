/*
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-21 17:05:31
 * @LastEditors: jiang-li-xiu 2663282851@qq.com
 * @LastEditTime: 2022-08-13 21:00:47
 */
// 用户模块

export default {
    namespaced: true,
    state() {
        return {
            // 用户信息
            profile: {
                id: '',
                avatar: '',
                nickname: '',
                account: '',
                mobile: '',
                // token: '1',
                token: '',
            }
        }
    },
    mutations: {
        // 修改用户信息，payload：用户信息对象
        setUser(state, playload) {
            state.profile = playload
        }
    }
}