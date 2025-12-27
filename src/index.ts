import { toArray, type Preset } from '@unocss/core'

import { presetMini } from '@unocss/preset-mini'
import type { Theme } from './theme.js'
import { preflights } from './preflights.js'
import { rules } from './rules/index.js'
import { shortcuts } from './shortcuts.js'
import { theme } from './theme.js'
import type { PresetOutloudOptions } from './types.js'

export type { Theme }

export function presetOutloud(options: PresetOutloudOptions = {}): Preset<Theme> {
  const remRE = /(-?[.\d]+)rem/g

  const mini = presetMini(options) as Preset<Theme>

  return {
    ...mini,
    name: '@outloud/css',
    theme,
    rules,
    preflights: [
      ...(mini.preflights ?? []),
      ...preflights(options),
    ],
    shortcuts,
    postprocess: [
      ...toArray(mini.postprocess),
      (util) => {
        util.entries.forEach((i) => {
          const value = i[1]
          if (typeof value === 'string' && remRE.test(value)) {
            i[1] = value.replace(remRE, (_, p1) => `${p1 / 4}rem`)
          }
        })
      },
    ],
  }
}
