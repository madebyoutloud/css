import type { CSSObject, Rule, RuleContext } from '@unocss/core'
import type { Theme } from '../theme'
import { convertSize } from '../utils/helpers'

export const gridSystem: Rule<Theme>[] = [
  [/^columns$/, (_, { theme }) => ({ 'display': 'flex', 'flex-flow': 'row wrap', '--gap': convertSize(theme.grid?.gap ?? 0, theme), 'gap': 'var(--gap)' })],
  ['col', { 'flex': '0 0 auto', 'width': '100%', 'max-width': '100%' }],
  ['col-auto', { width: 'auto' }],
  ['col-fill', { flex: '1 0 0%' }],
  [/^col-(\d+)$/, ([_, v], { theme }) => {
    const { columns = 12 } = theme.grid ?? {}
    const value = Number(v)

    if (value <= columns) {
      return {
        width: `calc((100% / ${columns} * ${value}) - var(--gap) / (${columns} / ${columns - value}))`,
      }
    }
  }],
  [/^col-gap-(\d+)$/, handleGap, { autocomplete: ['col-gap-<num>'] }],
]

function handleGap([_, v]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined {
  if (theme.spacing?.includes(Number(v)))
    return { '--gap': convertSize(v, theme) }
}
