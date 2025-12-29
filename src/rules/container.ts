import type { CSSObject, Rule } from '@unocss/core'
import type { Theme } from '../theme.js'
import { toSize } from '../helpers.js'

export const container: Rule<Theme>[] = [
  [
    /^container$/, (_, { rawSelector, theme }) => {
      const selector = rawSelector.startsWith('[') ? rawSelector : '.' + rawSelector

      const properties: CSSObject = {
        '--un-padding': '0',
        '--un-max-width': '0',
        'container-type': 'inline-size',
        'max-width': 'calc(var(--un-max-width) + (var(--un-padding) * 2))',
        'padding': 'var(--un-padding)',
        'margin-inline': 'auto',
      }

      const main: [string, CSSObject] = [selector, properties]
      const entries: [string, CSSObject][] = [main]

      if (theme.container) {
        const padding = theme.container.padding
        padding && (properties['--un-padding'] = toSize(padding))
        const maxWidth = resolveDefault(theme.container.maxWidth)
        maxWidth && (properties['--un-max-width'] = toSize(maxWidth))

        const sizes = typeof theme.container.maxWidth === 'object' ? theme.container.maxWidth : {}

        for (const [key, value] of Object.entries(sizes)) {
          if (key.toLowerCase() === 'default') {
            continue
          }

          entries.push([`${selector}[data-size=${key}]`, { '--un-max-width': toSize(value) }])
        }
      }

      return entries.map(([ruleSelector, props]) => {
        const style = Object.entries(props)
          .map(([key, value]) => `${key}:${value}`)
          .join(';')

        return `${ruleSelector}{${style}}`
      })
        .join('\n')
    },
  ],
]

function resolveDefault(value: string | number | Record<string, string | number> | undefined) {
  if (value && typeof value === 'object') {
    return value.default ?? value.DEFAULT
  }

  return value
}
