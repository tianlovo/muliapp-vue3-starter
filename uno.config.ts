import { defineConfig } from 'unocss'
import presetWind3 from '@unocss/preset-wind3'
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
  presets: [
    // 基础原子类
    presetWind3(),
    // 支持 <div text-red />
    presetAttributify(),
  ],
  // 摇树：仅生成使用到的原子类
  safelist: []           // 如有动态 class 可在此强制保留
})
