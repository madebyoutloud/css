import type { StaticRule } from '@unocss/core'
import type { Theme } from '../theme'
import { globalKeywords } from './mappings'

export function convertSize(value: string | number, theme: Theme) {
  if (value === 'auto')
    return value

  const numberValue = Number(value)

  if (theme.unit === 'rem')
    return `${numberValue / (theme.baseFontSize ?? 16)}rem`

  return `${numberValue}${theme.unit ?? ''}`
}

export function makeGlobalStaticRules(prefix: string, property?: string): StaticRule[] {
  return globalKeywords.map(keyword => [`${prefix}-${keyword}`, { [property ?? prefix]: keyword }])
}

export function getBracket(str: string, open: string, close: string) {
  if (str === '')
    return

  const l = str.length
  let parenthesis = 0
  let opened = false
  let openAt = 0
  for (let i = 0; i < l; i++) {
    switch (str[i]) {
      case open:
        if (!opened) {
          opened = true
          openAt = i
        }
        parenthesis++
        break

      case close:
        --parenthesis
        if (parenthesis < 0)
          return
        if (parenthesis === 0) {
          return [
            str.slice(openAt, i + 1),
            str.slice(i + 1),
            str.slice(0, openAt),
          ]
        }
        break
    }
  }
}
