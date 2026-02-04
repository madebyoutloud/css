import type { Rule } from '@unocss/core'
import { grids as baseGrids } from '@unocss/preset-mini/rules'
import type { Theme } from '../theme.js'
import { toSize } from '../helpers.js'
import { entriesToCss } from './helpers.js'

const colRule = String(/^(?:grid-)?(row|col)-(.+)$/)

export const grids: Rule<Theme>[] = [
  ...baseGrids.map((rule) => {
    // replace the original grid row/col rule to avoid conflicts with col-*
    if (String(rule[0]) === colRule) {
      rule[0] = /^grid-(row|col)-(.+)$/
    }

    return rule
  }) as Rule<Theme>[],
  [
    /^columns$/, (_, { rawSelector, theme }) => {
      const selector = rawSelector.startsWith('[') ? rawSelector : '.' + rawSelector
      const columns = theme.grid?.columns

      return entriesToCss([
        [
          selector, {
            'display': 'grid',
            'grid-template-columns': `repeat(${columns}, minmax(0, 1fr))`,
            'gap': toSize(theme.grid?.gap ?? 0),
          },
        ],
        [`${selector} > *`, { 'grid-column': `span ${columns} / span ${columns}` }],
      ])
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
