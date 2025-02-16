import type { Rule } from '@unocss/core'
import type { Theme } from '../theme'

export const grid: Rule<Theme>[] = [
  [/^grid-cols-(\d+)$/, ([_, v]) => ({ 'grid-template-columns': `repeat(${v}, minmax(0, 1fr))` })],
  [/^col-(\d+)$/, ([_, v], { theme }) => {
    const { columns = 12 } = theme.grid ?? {}
    const value = Number(v)

    if (value <= columns)
      return { 'grid-column': `span ${value} / span ${value}` }
  }],
  [/^offset-(\d+)$/, ([_, v], { theme }) => {
    const { columns = 12 } = theme.grid ?? {}
    const value = Number(v)

    if (value <= columns - 1)
      return { 'grid-column-start': `${value}` }
  }],
]
