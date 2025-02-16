import type { CSSEntries, Rule, RuleContext } from '@unocss/core'
import { gapMap } from '../utils/mappings'
import type { Theme } from '../theme'
import { convertSize } from '../utils/helpers'

export const gap: Rule[] = [
  [/^gap-(\d+)$/, handleGap, { autocomplete: 'gap-$spacing' }],
  [/^gap-([xy])-(\d+)$/, handleGap, { autocomplete: 'gap-(x|y)-$spacing' }],
]

function handleGap([_, direction, v]: string[], { theme }: RuleContext<Theme>): CSSEntries | undefined {
  if (v === undefined) {
    v = direction
    direction = ''
  }

  if (theme.spacing?.includes(Number(v)))
    return gapMap[direction].map(i => [`${i}gap`, convertSize(v, theme)])
}
