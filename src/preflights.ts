import type { Preflight } from '@unocss/core'
import type { Colors, Theme } from './theme'

export const preflights: Preflight<Theme>[] = [
  {
    layer: 'preflights',
    getCSS({ theme }) {
      if (!theme.colors) {
        return
      }

      const css = collectColors(theme.colors)
        .join('\n')

      return `:root{${css}}`
    },
  },
]

function collectColors(colors: Colors, path: string[] = []): string[] {
  return Object.entries(colors).map(([key, value]) => {
    if (typeof value === 'string') {
      return `--color-${[...path, key].join('-')}: ${value};`
    }

    return collectColors(value, [...path, key])
  }).flat()
}
