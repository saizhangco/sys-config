import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import Fonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vghks/', // 你可以改成 /app/ /h5/ / 等
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Fonts({
      fontsource: {
        families: [
          {
            name: 'Roboto',
            weights: [100, 300, 400, 500, 700, 900],
            styles: ['normal', 'italic'],
          },
        ],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  publicDir: 'vghks',
  server: {
    port: 3000,
    open: true, // 服务启动时自动在浏览器中打开应用
    // 反向代理配置
    proxy: { // 配置多个代理
      '/api': {
        target: 'http://127.0.0.1:8081/', // 例子:http://192.168.1.177:8080 或测试服务器https://xxxx.com
        changeOrigin: true, /// 设置访问目标地址允许跨域
        rewrite: p => p.replace(/^\/api/, ''),
      },
    },
  },
})
