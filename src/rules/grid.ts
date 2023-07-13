import type { CSSEntries, Rule, RuleContext } from '@unocss/core'
import { gapMap } from '../utils/mappings'
import type { Theme } from '../theme'
import { convertSize } from '../utils/helpers'

export const gridSystem: Rule<Theme>[] = [
  [/^columns$/, (_, { theme }) => ({ 'display': 'flex', 'flex-flow': 'row wrap', '--gap': convertSize(theme.grid?.gap ?? 0, theme), 'gap': 'var(--gap)' })],
  ['col', { 'flex': '0 0 auto', 'width': '100%', 'max-width': '100%' }],
  ['col-auto', { width: 'auto' }],
  ['col-fill', { flex: '1 0 0%' }],
  [/^col-(\d+)$/, ([_, v], { theme }) => {
    const grid = theme.grid ?? {}
    const totalColumns = grid.columns ?? 1
    const columns = Number(v)

    if (columns <= totalColumns) {
      return {
        width: `calc(${columns / totalColumns * 100}% - var(--gap) / ${totalColumns / (totalColumns - columns)})`,
      }
    }
  }],
]

export const gaps: Rule[] = [
  [/^gap()-(\d+)$/, handleGap, { autocomplete: ['gap-<num>'] }],
  [/^gap-([xy])-(\d+)$/, handleGap, { autocomplete: ['gap-(x|y)-<num>'] }],
  [/^(col)-gap-(\d+)$/, handleGap, { autocomplete: ['col-gap-<num>'] }],
]

function handleGap([_, direction, v]: string[], { theme }: RuleContext<Theme>): CSSEntries | undefined {
  if (theme.spacers?.includes(Number(v)))
    return gapMap[direction].map(i => [`${i}gap`, convertSize(v, theme)])
}
