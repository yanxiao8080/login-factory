import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import * as path from "path";


// https://vitejs.dev/config/
export default ({mode})=>{
  const env = loadEnv(mode, process.cwd())
  console.log('env',env)
  return defineConfig({
    plugins: [
      vue(),
      vueJsx()
    ],
    resolve: {
      alias: {
        '@': `${path.resolve(__dirname, 'src')}`
      }
    },
    base: env.VITE_BASE,
    build: {
      outDir: 'docs'
    }
  })
}
