declare global {
  import '@umijs/max/typings'
}

declare const ENV_BUILD_ENV: string

declare const PROCESS_IS_DEV: boolean

declare interface ResultData<T = any> {
  code: string | number
  data: T
  message: string
  [key: string]: any
}

declare interface PageData<T = any> {
  page_num?: number
  page_size?: number
  count?: number
  data?: Array<T>
}
