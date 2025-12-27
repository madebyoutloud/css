import type { Rule } from '@unocss/core'
import { grids as baseGrids } from '@unocss/preset-mini/rules'
import { h } from '@unocss/preset-mini/utils'
import type { Theme } from '../theme.js'

const colRule = String(/^(?:grid-)?(row|col)-(.+)$/)

export const grids: Rule<Theme>[] = [
  ...baseGrids.map((rule) => {
    if (String(rule[0]) === colRule) {
      rule[0] = /^grid-(row|col)-(.+)$/
    }

    return rule
  }) as Rule<Theme>[],
  [
    /^columns$/, (_, { theme }) => {
      return {
        'display': 'grid',
        'grid-template-columns': `repeat(${theme.grid?.columns},minmax(0,1fr))`,
        'gap': h.bracket.cssvar.global.fraction.rem(String(theme.grid?.gap ?? 0)),
      }
    },
  ],
  [
    /^col-(\d+)$/, ([_, v]) => {
      const value = Number(v)

      return { 'grid-column': `span ${value} / span ${value}` }
    },
  ],
  [
    /^offset-(\d+)$/, ([_, v]) => {
      return { 'grid-column-start': `${Number(v)}` }
    },
  ],
]
