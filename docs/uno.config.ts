import path from 'node:path'
import { defineConfig, presetAttributify, transformerDirectives, type Preset } from 'unocss'
import { presetOutloud, type Theme } from '@outloud/css'
import extractorMdc from '@unocss/extractor-mdc'

export default defineConfig<Theme>({
  content: {
    filesystem: [path.resolve('./content/**/*.md')],
  },
  theme: {
    colors: {
      primary: '#ff3712',
    },
    flow: {
      maxWidth: 400,
      breakoutMaxWidth: 600,
      padding: 16,
    },
    container: {
      maxWidth: { default: 600, sm: 400 },
      padding: 16,
    },
  },
  presets: [
    presetOutloud({
      prefix: 'o-',
    }) as Preset<Theme>,
    presetAttributify(),
  ],
  transformers: [transformerDirectives()],
  extractors: [extractorMdc()],
  rules: [
    [
      'o-bg-stripes', {
        'background-color': '#e879f91a',
        'background-image': 'linear-gradient(135deg, #ff3712 10%, transparent 0, transparent 50%, #ff3712 0, #ff3712 60%, transparent 0, transparent)',
        'background-size': '7.07px 7.07px',
      },
    ],
  ],
})
