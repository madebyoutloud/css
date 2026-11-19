import type { Preset } from '@unocss/core'
import { presetMini } from '@unocss/preset-mini'
import { colorPreflight, extendTheme } from './colors.js'
import { rules } from './rules/index.js'
import { theme, type Theme } from './theme.js'
import type { PresetOutloudOptions } from './types.js'

export type { Theme }
export { colorVariable, toColorVariables } from './colors.js'
export type { PresetOutloudOptions }

export function presetOutloud(options: PresetOutloudOptions = {}): Preset<Theme> {
  const mini = presetMini(options) as Preset<Theme>

  return {
    ...mini,
    name: '@outloud/css',
    theme,
    rules,
    extendTheme,
    preflights: [...(mini.preflights ?? []), colorPreflight(options)],
  }
}
