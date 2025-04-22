import type { Rule } from '@unocss/core'
import type { Theme } from '../theme'
import { colorResolver } from '@unocss/preset-mini/utils'

export const backgroundColor: Rule<Theme>[] = [
  [/^bg-(.+)$/, colorResolver('background-color', 'bg', 'backgroundColor'), { autocomplete: 'bg-$colors' }],
]
