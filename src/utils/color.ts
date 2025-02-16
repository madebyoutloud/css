import type { CSSObject, RuleContext } from '@unocss/core'
import type { Theme } from '../theme'
import { colorToString, parseCssColor } from '@unocss/rule-utils'

function parseColor(value: string, theme: Theme) {
  const [key, alpha] = value.split('/')
  const keys = key.split('.')
  const data = keys.reduce((t, k) => t?.[k], theme.colors as any)
  let colorValue = typeof data === 'string' ? data : undefined

  if (!colorValue) {
    return
  }

  if (alpha && !Number.isNaN(Number(alpha))) {
    const color = parseCssColor(colorValue)

    if (color) {
      colorValue = colorToString(color, Number(alpha) / 100)
    }
  }

  return colorValue
}

export function colorResolver(property: string) {
  return ([, body]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined => {
    const color = parseColor(body, theme)

    if (!color) {
      return
    }

    // return {
    //   [`--un-${property}-opacity`]: 1,
    //   [property]: `${color} / var(--un-${property}-opacity)`,
    // }

    return {
      [property]: color,
    }
  }
}
