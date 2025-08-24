// src/main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// 重置样式(会把所有原生标签样式全部去除)
import '@unocss/reset/tailwind-compat.css';
// UnoCSS 生成的原子类（虚拟模块）
import 'virtual:uno.css';
// 全局样式入口
import '@/assets/styles/index.scss';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
