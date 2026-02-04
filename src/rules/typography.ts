import { toArray, type CSSObject, type Rule, type RuleContext } from '@unocss/core'
import type { Theme } from '@unocss/preset-mini'
import { fonts as baseFonts } from '@unocss/preset-mini/rules'
import { h } from '@unocss/preset-mini/utils'

export const fonts: Rule<Theme>[] = [
  ...baseFonts,
  [/^fs-(.+)$/, handleSize, { autocomplete: 'fs-$fontSize' }],
]

function handleSize([, s]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined {
  const themed = toArray(theme.fontSize?.[s!]) as [string, string | CSSObject]
  const size = themed?.[0] ?? h.bracket.cssvar.global.rem(s!)
  if (size !== null && size !== undefined) {
    return { 'font-size': size }
  }
}
