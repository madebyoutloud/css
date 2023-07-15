import { defineConfig, presetAttributify, transformerDirectives } from 'unocss'
import type { Theme } from '@outloud/css'
import { presetOutloud } from '@outloud/css'

export default defineConfig<Theme>({
  content: {
    filesystem: [
      'content/**/*.md',
    ],
  },
  presets: [
    presetOutloud({}),
    presetAttributify(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    colors: {
      'white': '#FFFFFF',
      'primary': '#EE4530',
      'red-900': '#EE4530',
      'dark': '#1A1D20',
      'neutral-900': '#1A1D20',
      'neutral-700': '#3D444B',
      'neutral-500': '#8C939D',
      'neutral-300': '#EFF2F5',
    },
  },
})
