import { defineConfig } from '@umijs/max'
import proxy from './proxy'

export default defineConfig({
  define: {
    PROCESS_IS_DEV: true,
  },
  proxy,
})
