import type { AxiosRequestConfig } from '@umijs/max'

// 声明一个Map 用于存储每个请求的标识 和 取消函数
let pendingMap = new Map<string | symbol, AbortController>()

class AxiosCanceler {
  /**
   * 添加请求
   */
  addPending(config: AxiosRequestConfig) {
    // 在请求开始前，对之前的请求做检查取消操作
    this.removePending(config)
    const cancelKey = config.cancelKey
    if (!cancelKey) {
      return
    }
    const abortController = new AbortController()
    config.signal = abortController.signal
    pendingMap.set(cancelKey, abortController)
  }

  /**
   * 移除请求
   */
  removePending(config: AxiosRequestConfig, needCancel = true) {
    const cancelKey = config.cancelKey
    if (!cancelKey) {
      return
    }
    if (pendingMap.has(cancelKey)) {
      // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
      if (needCancel) {
        const abortController = pendingMap.get(cancelKey)
        abortController?.abort()
      }
      pendingMap.delete(cancelKey)
    }
  }

  /**
   * 清空所有pending
   */
  removeAllPending() {
    pendingMap.forEach((abortController) => {
      abortController.abort()
    })
    pendingMap.clear()
  }

  /**
   * 重置
   */
  reset(): void {
    pendingMap.clear()
  }
}

export const axiosCanceler = new AxiosCanceler()

declare module '@umijs/max' {
  interface AxiosRequestConfig {
    cancelKey?: symbol | string
  }
}
