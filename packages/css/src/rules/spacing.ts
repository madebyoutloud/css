import type { CSSEntries, DynamicMatcher, Rule, RuleContext } from '@unocss/core'
import { directionMap } from '../utils/mappings'
import type { Theme } from '../theme'
import { convertSize } from '../utils/helpers'

export const padding: Rule[] = [
  [/^p()-(\d+)$/, handle('padding'), { autocomplete: ['p-<num>'] }],
  [/^p([rltb])-(\d+)$/, handle('padding'), { autocomplete: ['p<directions>-<num>'] }],
  [/^p([xy])-(\d+)$/, handle('padding'), { autocomplete: ['p(x|y)-<num>'] }],
]

export const margin: Rule[] = [
  [/^m()-(\d+|auto)$/, handle('margin'), { autocomplete: ['m-<num>'] }],
  [/^m([rltb])-(\d+|auto)$/, handle('margin'), { autocomplete: ['m<directions>-<num>'] }],
  [/^m([xy])-(\d+|auto)$/, handle('margin'), { autocomplete: ['m(x|y)-<num>'] }],
]

function handle(property: string): DynamicMatcher {
  return ([_, direction, v]: string[], { theme }: RuleContext<Theme>): CSSEntries | undefined => {
    if (v === 'auto' || theme.spacing?.includes(Number(v)))
      return directionMap[direction].map(i => [`${property}${i}`, convertSize(v, theme)])
  }
}
