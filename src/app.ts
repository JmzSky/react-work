import { TOKEN, X_TENANT } from '@/constants'
import LayoutConfig from '@/layouts/Layout'
import { getQueryString } from '@/utils'
import {
  errorHandler,
  requestInterceptors,
  responseInterceptors,
} from '@/utils/request'
import { RequestConfig } from '@umijs/max'

// 运行时配置
export const layout = LayoutConfig

//修改react-dom 渲染时的根组件
export function rootContainer(container: any) {
  const token = getQueryString('token')
  const tenantId = getQueryString('tenant_id')
  token && localStorage.setItem(TOKEN, token)
  tenantId && localStorage.setItem(X_TENANT, tenantId)
  if (token) {
    let newUrl = window.location.href.replace(/token=[^&]+&?/, '')
    if (tenantId) {
      newUrl = newUrl.replace(/tenant_id=[^&]+&?/, '')
    }
    newUrl = newUrl.replace(/(\?|&)$/, '')
    window.location.href = newUrl
    return
  }
  return container
}

export const request: RequestConfig = {
  baseURL: process.env.NODE_ENV === 'development' ? '/dev-api' : '',
  timeout: 40000,
  errorConfig: { errorHandler },
  requestInterceptors,
  responseInterceptors,
}
