// * 请求枚举配置
/**
 * @description：请求配置
 */
export enum ResultEnum {
  SUCCESS = 0,
  SCRM_SUCCESS = '100',
  NOSEARCH = 400000,
  ERROR = 500000,
  OVERDUE = '102',
}

/**
 * 不需要全局报错的错误码
 */
export const disableGlobalErrorCode: number[] = []
