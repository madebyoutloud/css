import type { Preset } from '@unocss/core'

import type { Theme } from './theme'
import { rules } from './rules'
import { shortcuts } from './shortcuts'
import { theme } from './theme'
import { variants } from './variants'

export type { Theme }
export * from './helpers'

export interface OutloudOptions {
  separators?: string[]
}

export function presetOutloud(options: OutloudOptions = {}): Preset<Theme> {
  options.separators = options.separators ?? [':']

  return {
    name: 'unocss-preset-outloud',
    options,
    theme,
    variants: variants(options),
    rules,
    shortcuts,
  }
}
