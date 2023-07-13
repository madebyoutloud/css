import { defineConfig, presetAttributify } from 'unocss'
import type { Theme } from '@outloud/css'
import { presetOutloud } from '@outloud/css'

export default defineConfig<Theme>({
  presets: [presetOutloud(), presetAttributify()],
  theme: {
    colors: {
      black: '#000',
      white: '#fff',
    },
  },
})
