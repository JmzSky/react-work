import { RunTimeLayoutConfig } from '@umijs/max'
import ErrorBoundary from './components/ErrorBoundary'

const LayoutConfig: RunTimeLayoutConfig = () => {
  return {
    layout: 'mix',
    openKeys: false,
    menu: {
      locale: false,
    },
    menuProps: {
      defaultOpenKeys: ['/'],
    },
    token: {
      // 参见ts声明，demo 见文档，通过token 修改样式
      //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
      sider: {
        colorMenuBackground: '#ffffff',
        colorTextMenuTitle: 'rgba(76, 86, 102, 1)',
        colorTextMenuSelected: '#0173F7',
        colorBgMenuItemSelected: 'rgba(230,243,254,1)',
      },
    },
    siderWidth: 160,
    headerHeight: 56,
    menuDataRender: (menuItems: any) => {
      return menuItems.map((item: any) => {
        return {
          ...item,
          icon:
            typeof item.icon === 'string' && item.icon.indexOf('icon') > -1 ? (
              <i className={`${item.icon}`} />
            ) : (
              item.icon
            ),
        }
      })
    },
    ErrorBoundary,
  }
}

export default LayoutConfig
