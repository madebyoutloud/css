import type { Preset } from '@unocss/core'

import { rules } from './rules'
import { variants } from './variants'
import { shortcuts } from './shortcuts'
import type { Theme } from './theme'
import { theme } from './theme'

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
