import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores([
    '**/dist/**', '**/dist-ssr/**', '**/coverage/**',
    'env.d.ts', '**/logger.ts'
  ]),

  // Vue3 必备规则
  pluginVue.configs['flat/essential'],

  // TypeScript 推荐规则
  vueTsConfigs.recommended,

  // 代码质量规则
  {
    name: 'app/custom-rules',
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // 2. 允许 any
      'no-multi-spaces': 'error', // 3. 不允许多个连续空格
      'space-unary-ops': 'error', // 4. 一元运算符后空格
      'space-infix-ops': 'error', // 5. 中缀操作符空格
      'space-before-blocks': 'error', // 6. 代码块前空格
      'no-mixed-spaces-and-tabs': 'error', // 7. 空格/制表符不混用
      'no-multiple-empty-lines': ['error', { max: 2 }], // 8. 空行 ≤ 2
      'no-trailing-spaces': 'error', // 9. 行尾无空格
      'no-whitespace-before-property': 'error', // 10. 属性名与点间无空格
      'no-irregular-whitespace': 'error', // 11. 无不规则空白
      'operator-linebreak': ['error', 'after'], // 13. 运算符在行尾
      'no-extra-semi': 'error', // 14. 无多余分号
      curly: 'error', // 15. 所有控制结构大括号
      'key-spacing': ['error', { beforeColon: false, afterColon: true }], // 16
      'comma-spacing': ['error', { after: true }], // 17. 逗号后空格
      camelcase: 'error', // 18. 驼峰命名
      'new-cap': 'error', // 19. 构造函数首字母大写
      'spaced-comment': ['error', 'always'], // 20. 注释后空格
      eqeqeq: ['error', 'always'], // 21. 强制 ===
      'no-else-return': 'error', // 22. 禁止多余 else
      'no-loop-func': 'error', // 23. 禁止循环中定义函数
      '@typescript-eslint/no-unnecessary-type-assertion': 'off', // 24 关闭提示
      '@typescript-eslint/no-type-alias': 'off', // 25 关闭提示
      'no-implicit-coercion': 'error', // 27. 禁止隐式转换
      radix: ['error', 'always'], // 28. parseInt 指定进制
      quotes: ['error', 'single'], // 29. 单引号
      'no-array-constructor': 'error', // 30. 禁止 Array 构造器
      'max-params': ['error', 6], // 31. 函数参数 ≤ 6
      'no-eval': 'error', // 32. 禁止 eval
      'prefer-const': 'error', // 33. 必须用 const
      'no-var': 'error', // 34. 禁止 var
      'prefer-destructuring': 'warn', // 35. 建议解构
      'prefer-template': 'warn', // 36. 建议模板字符串
      'template-curly-spacing': ['error', 'never'], // 37. 花括号内无空格
      'no-duplicate-imports': 'error', // 38. 禁止重复导入
      '@typescript-eslint/no-unused-vars': 'error', // 39. 禁止未使用变量
      '@typescript-eslint/explicit-function-return-type': 'off', // 40. 允许省略返回类型
      'no-console': 'error', // 41. 禁止任何 console.* 调用
    },
  },

  // 强制 template → script → style（Flat Config）
  {
    name: 'app/block-order',
    rules: {
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
      // 强制 <script setup lang="ts">
      'vue/component-api-style': ['error', ['script-setup']],
    },
  },

  // 让 Prettier 负责格式化，ESLint 不再管
  skipFormatting
);
