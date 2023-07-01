import type { Rule } from '@unocss/core'
import type { Theme } from '../theme'

export const colors: Rule<Theme>[] = [
  [/^text-(.+)$/, ([_, v], { theme }) => {
    const colorValue = theme.colors?.[v]

    if (colorValue)
      return { color: colorValue }
  }],
  [/^bg-(.+)$/, ([_, v], { theme }) => {
    const colorValue = theme.colors?.[v]

    if (colorValue)
      return { 'background-color': colorValue }
  }],
  [/^border-(.+)$/, ([_, v], { theme }) => {
    const colorValue = theme.colors?.[v]

    if (colorValue)
      return { 'border-color': colorValue }
  }],
]
