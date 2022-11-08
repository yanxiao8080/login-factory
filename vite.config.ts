import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import * as path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
  ],
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`
    }
  },

  // 反向代理这样配置
  server: {
    // port: 5174,
    // host: '192.168.1.168',
    // 是否自动在浏览器打开
    open: true,
    // 是否开启 https
    https: false,
    proxy: {
      '/authApi/': {
        target: 'http://192.168.1.66:8090',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/authApi/, '/'),
      }
    }
  }
})
