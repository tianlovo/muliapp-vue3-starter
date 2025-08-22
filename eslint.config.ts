import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  // Vue3 必备规则
  pluginVue.configs['flat/essential'],

  // TypeScript 推荐规则
  vueTsConfigs.recommended,

  // 强制 template → script → style（Flat Config）
  {
    name: 'app/block-order',
    rules: {
      'vue/block-order': [
        'error',
        { order: ['template', 'script', 'style'] },
      ],
      // 强制 <script setup lang="ts">
      'vue/component-api-style': ['error', ['script-setup']],
    },
  },

  // 让 Prettier 负责格式化，ESLint 不再管
  skipFormatting,
)
