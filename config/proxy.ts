export default {
  '/dev-api': {
    target: process.env.ENV_API_PROXY,
    changeOrigin: true,
    pathRewrite: {
      '/dev-api': '',
    },
  },
}
