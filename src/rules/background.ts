import type { Rule } from '@unocss/core'
import type { Theme } from '../theme'
import { colorResolver } from '../utils/color'

export const backgroundColor: Rule<Theme>[] = [
  [/^bg-(.+)$/, colorResolver('background-color'), { autocomplete: 'bg-$colors' }],
]
