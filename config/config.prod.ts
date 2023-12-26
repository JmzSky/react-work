import { defineConfig } from '@umijs/max'

export default defineConfig({
  define: {
    PROCESS_IS_DEV: false,
  },
  jsMinifier: 'terser',
  jsMinifierOptions: {
    compress: {
      drop_console: true,
    },
  },
})
