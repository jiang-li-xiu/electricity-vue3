/*
 * @Descripttion: 
 * @Author: JLX
 * @Date: 2022-07-21 17:05:31
 * @LastEditors: JLX
 * @LastEditTime: 2022-07-22 11:53:12
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
                token: '1',
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