import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

export default defineConfig({
  server: {
    proxy: {
      // 将 /api 的请求代理到后端服务器
      '/api': {
        target: 'http://49.234.192.196:8080', // 后端服务器地址

        //target: 'http://127.0.0.1:4523/m1/5505077-5181244-default',
        changeOrigin: true, // 修改请求头的 origin 为目标地址
        rewrite: (path) => path.replace(/^\/api/, ''), // 将 /api 替换为空
      },
    },
  },
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [VantResolver()],
    }),
    Components({
      dirs: ['src/components', 'src/components/item', 'src/components/task'],
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
