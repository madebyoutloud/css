import type { Rule } from '@unocss/core'
import type { Theme } from '../theme'

export const backgroundColor: Rule<Theme>[] = [
  [/^bg-(.+)$/, ([_, v], { theme }) => {
    const colorValue = theme.colors?.[v]

    if (colorValue)
      return { 'background-color': colorValue }
  }],

]
