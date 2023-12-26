import { Button, Empty } from 'antd'
import type { ErrorInfo } from 'react'
import React from 'react'

/**
 * 错误边界处理
 */
class ErrorBoundary extends React.Component<
  Record<string, any>,
  { hasError: boolean; errorInfo: string }
> {
  state = { hasError: false, errorInfo: '' }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error.message }
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-console
    // reportError(error);
    console.log(error, errorInfo)
  }

  getErrorMsg = () => {
    if (!window.navigator.onLine) {
      return '未连接到互联网，请稍后重试'
    } else {
      return this.state.errorInfo
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="vertical-middle-layout">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className="ik-empty-container"
            description={
              <>
                <p className="color-text-base">
                  请刷新页面，若无法修复，请联系客服
                </p>
                <p className="color-text-tips">{this.getErrorMsg()}</p>
              </>
            }
          >
            <Button
              type="primary"
              onClick={() => {
                window.location.reload()
              }}
            >
              刷新页面
            </Button>
          </Empty>
        </div>
      )
    }
    return this.props.children
  }
}
export default ErrorBoundary
