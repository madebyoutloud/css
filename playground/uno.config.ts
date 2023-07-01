import { defineConfig } from 'unocss'
import type { Theme } from '@outloud/css'
import { presetOutloud } from '@outloud/css'

export default defineConfig<Theme>({
  presets: [presetOutloud()],
  theme: {},
})
