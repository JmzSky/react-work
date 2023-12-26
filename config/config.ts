import { defineConfig } from '@umijs/max'
import routes from './routes'

export default defineConfig({
  lessLoader: {
    modifyVars: {
      // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
      hack: `true; @import "@/assets/styles/var.less";@import "@/assets/styles/antdVar.less";`,
    },
    javascriptEnabled: true,
  },
  hash: true,
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes,
  npmClient: 'pnpm',
  locale: {
    default: 'zh-CN',
    antd: true,
  },
  valtio: {},
  define: {
    ENV_BUILD_ENV: process.env.ENV_BUILD_ENV,
  },
})
