import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import { visualizer } from 'rollup-plugin-visualizer'

const PROD_NAME = 'production'

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => ({
  define: {
    __PROD__: JSON.stringify(mode === PROD_NAME),
  },

  plugins: [
    vue(),
    // eslint-disable-next-line new-cap
    UnoCSS(),
    visualizer({
      open: false, // 构建后自动打开报告
      gzipSize: true, // 显示 gzip 压缩大小
      filename: './build/pack-stats.html' // 输出文件名
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
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
      },
    },
    // 开启 CSS 代码分割，开发调试用
    devSourcemap: mode !== PROD_NAME,
  },

  build: {
    sourcemap: mode !== PROD_NAME,
    minify: 'esbuild',
    // 按 chunk 切割 css
    cssCodeSplit: true,
    rollupOptions: {
      // 生产环境不打入一些特定的包
      external: command === 'build' ? ['tslog'] : [],
    },
    outDir: './build/dist',
  },

  esbuild: {
    // 移除生产环境中的函数
    drop: ['console', 'debugger'],
    treeShaking: true,
  },

  server: {
    port: 16173,
    hmr: true,
  },
}));
