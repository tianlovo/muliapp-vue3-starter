// src/utils/base/bem.ts
const ns = 'xlyo';
const es = '__';
const ms = '--';

/**
 * 生成 BEM 风格的 CSS 类名
 * <br>
 * BEM 是一种前端命名方法论，通过 `block__element--modifier` 的形式来命名 CSS 类
 * @param block - 块名称，通常是组件的主类名
 * @param element - 元素名称，可选，表示块的子元素
 * @param modifier - 修饰符名称，可选，表示块或元素的不同状态或变体
 * @returns 完整的 BEM 类名字符串
 */
export default function bem(block: string, element?: string, modifier?: string): string {
  let cls = `${ns}-${block}`;
  if (element) cls += `${es}${element}`;
  if (modifier) cls += `${ms}${modifier}`;
  return cls;
}
