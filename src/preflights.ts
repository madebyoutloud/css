import type { Preflight } from '@unocss/core'
import type { PresetOutloudOptions } from './types.js'
import type { Theme } from './theme.js'

export function preflights(options: PresetOutloudOptions): Preflight<Theme>[] {
  const result: Preflight<Theme>[] = []

  if (options.generateColorVariables) {
    result.push({
      layer: 'base',
      getCSS({ theme }) {
        if (!theme.colors) {
          return
        }

        const css = collectColors(theme.colors)
          .join('\n')

        return `:root{${css}}`
      },
    })
  }

  return result
}

function collectColors(colors: object, path: string[] = []): string[] {
  return Object.entries(colors)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `--color-${[...path, key].join('-')}: ${value};`
      }

      return collectColors(value, [...path, key])
    })
    .flat()
}
