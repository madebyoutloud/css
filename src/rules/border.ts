import type { CSSEntries, CSSObject, Rule, RuleContext } from '@unocss/core'
import type { Theme } from '../theme'
import { colorResolver } from '../utils/color'
import { convertSize } from '../utils/helpers'
import { directionMap } from '../utils/mappings'

export const borderWidth: Rule<Theme>[] = [
  [/^border-(\d+)$/, handlerBorderWidth, { autocomplete: 'border-<num>' }],
  [/^border-([rltb])-(\d+)$/, handlerBorderWidth, { autocomplete: 'border-(r|l|t|b)-<num>' }],
  [/^border-([xy])-(\d+)$/, handlerBorderWidth, { autocomplete: 'border-(x|y)-<num>' }],
]

export const borderRadius: Rule[] = [
  [/^rounded-full$/, handlerBorderRadius, { autocomplete: 'rounded-(full)' }],
  [/^rounded-(.+)$/, handlerBorderRadius, { autocomplete: 'rounded-<num>' }],
]

export const borderColor: Rule<Theme>[] = [
  [/^border-(.+)$/, colorResolver('border-color'), { autocomplete: 'border-$colors' }],
]

function handlerBorderWidth([, direction, v]: string[], { theme }: RuleContext<Theme>): CSSEntries | undefined {
  if (v === undefined) {
    v = direction
    direction = ''
  }

  return directionMap[direction].map(i => [`border${i}-width`, convertSize(v, theme, true)])
}

function handlerBorderRadius([, v]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined {
  if (!Number.isNaN(Number(v)) || v === 'full')
    return { 'border-radius': convertSize(v, theme) }
}
