// 示例
import { proxy, proxyWithDevtools } from '@umijs/max'

// 类型声明
export interface UserState {
  user: {
    name: string
  }
}

// 数据初始化
export const userState: UserState = proxy({
  user: {
    name: '@umijs/max',
  },
})

proxyWithDevtools(userState, { name: 'user', enabled: true })

export const userActions = {
  setUser(data: UserState['user']) {
    userState.user = data
  },
}
