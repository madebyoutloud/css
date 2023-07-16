import type { CSSEntries, DynamicMatcher, Rule, RuleContext } from '@unocss/core'
import { directionMap } from '../utils/mappings'
import type { Theme } from '../theme'
import { convertSize } from '../utils/helpers'

export const padding: Rule[] = [
  [/^p-(\d+)$/, handle('padding'), { autocomplete: ['p-$spacing'] }],
  [/^p([rltb])-(\d+)$/, handle('padding'), { autocomplete: ['p(t|l|b|r)-$spacing'] }],
  [/^p([xy])-(\d+)$/, handle('padding'), { autocomplete: ['p(x|y)-$spacing'] }],
]

export const margin: Rule[] = [
  [/^m-(\d+|auto)$/, handle('margin'), { autocomplete: ['m-$spacing'] }],
  [/^m([rltb])-(\d+|auto)$/, handle('margin'), { autocomplete: ['m(t|l|b|r)-$spacing'] }],
  [/^m([xy])-(\d+|auto)$/, handle('margin'), { autocomplete: ['m(x|y)-$spacing'] }],
]

function handle(property: string): DynamicMatcher {
  return ([_, direction, v]: string[], { theme }: RuleContext<Theme>): CSSEntries | undefined => {
    if (v === undefined) {
      v = direction
      direction = ''
    }

    if (v === 'auto' || theme.spacing?.includes(Number(v)))
      return directionMap[direction].map(i => [`${property}${i}`, convertSize(v, theme)])
  }
}
