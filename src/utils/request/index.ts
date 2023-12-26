import { TOKEN } from '@/constants'
import { AxiosRequestConfig, request, RequestConfig } from '@umijs/max'
import { message } from 'antd'
import jwtDecode from 'jwt-decode'
import { axiosCanceler } from './axiosCancel'
import { disableGlobalErrorCode, ResultEnum } from './constants'

type JwtInfo = {
  account_id: number
  exp: number
  roles: string
  tenant_id: number
  user_name: string
}

// 默认地址请求地址
const successCode = [ResultEnum.SUCCESS, ResultEnum.SCRM_SUCCESS]

const codeMessage: any = {
  400: '请求失败！请您稍后重试',
  401: '登录失效！请您重新登录',
  403: '当前账号无权限访问！',
  404: '你所访问的资源不存在！',
  405: '网络异常，请稍后再试~',
  408: '请求超时！请您稍后重试',
  500: '网络繁忙，请稍后再试',
  502: '网络繁忙，请稍后重试',
  503: '网络异常，请稍后再试',
  504: '网络异常，请稍后重试',
}

//请求前拦截
export const requestInterceptors: RequestConfig['requestInterceptors'] = [
  (options: AxiosRequestConfig) => {
    axiosCanceler.addPending(options)
    const baseUrl = PROCESS_IS_DEV ? '/dev-api' : ''
    const authorization = localStorage.getItem(TOKEN)
    try {
      // 解析 jwt 过期时间，过期自动跳转登录
      const jwtInfo: JwtInfo = jwtDecode(authorization!)
      if (
        Number.isInteger(jwtInfo.exp) &&
        Date.now() > new Date(jwtInfo.exp * 1000).getTime()
      ) {
        // passportLogin()
        return
      }
    } catch (error) {
      // passportLogin()
      return
    }
    const tenant = localStorage.getItem('X-Tenant')
    const authHeader = {
      Authorization: authorization,
      'X-Tenant': tenant,
    }
    if (!authorization || !tenant) {
      // return passportLogin()
      return
    }
    return {
      ...options,
      url: `${baseUrl}${options?.url}`,
      headers: {
        ...options?.headers,
        ...authHeader,
      },
    }
  },
]

//响应拦截
export const responseInterceptors: RequestConfig['responseInterceptors'] = [
  (response: any) => {
    const { data, config } = response
    // 在请求结束后，移除本次请求
    axiosCanceler.removePending(config, false)
    const responseCode = data.code
    const responseMessage = data.message
    // * 全局错误信息拦截区分
    if (responseCode && !successCode.includes(responseCode)) {
      message.destroy()
      !disableGlobalErrorCode.includes(responseCode) &&
        message.error(responseMessage)
      return Promise.reject(data)
    }
    return response
  },
]

//统一错误处理
export const errorHandler = (error: any) => {
  const { response } = error
  if (response && response.status === 401) {
    message.destroy()
    // message.error('登录失效！请您重新登录')
    // passportLogin()
    return Promise.reject(error)
  }
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText
    message.destroy()
    message.error(errorText)
    return Promise.reject(error)
  }
  // 超时
  if (
    error.code === 'ECONNABORTED' &&
    (error.message as string)?.startsWith?.('timeout')
  ) {
    message.error('网络异常，请稍后再试')
    throw error
  }
  // 断网
  if (error.code === 'ERR_NETWORK') {
    message.error('网络异常，请稍后再试')
    throw error
  }
  throw error
}

export class RequestApi {
  // * 常用请求方法封装
  get<T = any>(url: string, params?: any, options = {} as RequestConfig) {
    return request<ResultData<T>>(url, {
      method: 'GET',
      params: params,
      ...(options || {}),
    })
  }
  post<T = any>(url: string, body?: any, options = {} as RequestConfig) {
    return request<ResultData<T>>(url, {
      method: 'POST',
      data: body,
      ...(options || {}),
    })
  }
  delete<T = any>(url: string, body?: any, options = {} as RequestConfig) {
    return request<ResultData<T>>(url, {
      method: 'DELETE',
      data: body,
      ...(options || {}),
    })
  }
}

export default new RequestApi()

/**
 * 判断是否是取消请求导致的错误
 * @param err 错误
 * @returns
 */
export function isAxiosCancel(err: any) {
  return !!err?.__CANCEL__
}
