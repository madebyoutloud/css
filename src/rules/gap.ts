import type { CSSEntries, Rule, RuleContext } from '@unocss/core'
import type { Theme } from '../theme'
import { convertSize } from '../utils/helpers'
import { gapMap } from '../utils/mappings'

export const gap: Rule[] = [
  [/^gap-(\d+)$/, handleGap, { autocomplete: 'gap-<num>' }],
  [/^gap-([xy])-(\d+)$/, handleGap, { autocomplete: 'gap-(x|y)-<num>' }],
]

function handleGap([_, direction, v]: string[], { theme }: RuleContext<Theme>): CSSEntries | undefined {
  if (v === undefined) {
    v = direction
    direction = ''
  }

  return gapMap[direction].map(i => [`${i}gap`, convertSize(v, theme)])
}
