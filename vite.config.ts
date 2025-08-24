import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // eslint-disable-next-line new-cap
    UnoCSS(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  css: {
    // 使用 Dart Sass
    preprocessorOptions: {
      scss: {
        // 全局变量/工具
        additionalData: `
        @use "@/assets/styles/bem.scss" as *;
        @use "@/assets/styles/vars.scss" as *;
        `,
      }
    },
    // 开启 CSS 代码分割，开发调试用
    devSourcemap: true,
  },

  build: {
    sourcemap: false,
    minify: 'esbuild',
    // 按 chunk 切割 css
    cssCodeSplit: true,
  },

  server: {
    port: 16173,
    hmr: true,
  }
})
