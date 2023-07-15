import type { CSSEntries, CSSObject, Rule, RuleContext } from '@unocss/core'
import type { Theme } from '../theme'
import { directionMap } from '../utils/mappings'
import { convertSize } from '../utils/helpers'

export const borderWidth: Rule<Theme>[] = [
  [/^border()-(\d+)$/, handlerBorderWidth],
  [/^border-([rltb])-(\d+)$/, handlerBorderWidth],
  [/^border-([xy])-(\d+)$/, handlerBorderWidth],
]

export const borderRadius: Rule[] = [
  [/^rounded-(.+)$/, handlerBorderRadius],
]

export const borderColor: Rule<Theme>[] = [
  [/^border-(.+)$/, ([_, v], { theme }) => {
    const colorValue = theme.colors?.[v]

    if (colorValue)
      return { 'border-color': colorValue }
  }],
]

function handlerBorderWidth([, direction, v]: string[], { theme }: RuleContext<Theme>): CSSEntries | undefined {
  return directionMap[direction].map(i => [`border${i}-width`, convertSize(v, theme, true)])
}

function handlerBorderRadius([, v]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined {
  if (!Number.isNaN(Number(v)) || v === 'full')
    return { 'border-radius': convertSize(v, theme) }
}
