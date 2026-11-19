import type { Preflight } from '@unocss/core'
import type { Theme } from './theme.js'
import type { PresetOutloudOptions } from './types.js'

export type Colors = NonNullable<Theme['colors']>

// keywords stay in the theme as they are, a variable can't improve them
const keywordRE = /^(?:transparent|currentcolor|inherit|initial|unset|revert|none)$/i

// the theme's original colours, by the theme `extendTheme` returned
const originals = new WeakMap<object, Colors>()

/**
 * The variable of a theme colour: `--color-` and its path in kebab-case, without `DEFAULT`.
 * `brand.500` is `--color-brand-500`, `text.DEFAULT` is `--color-text`, `surface.cardBg` is `--color-surface-card-bg`.
 */
export function colorVariable(path: string[]): string {
  const name = path
    .filter((key) => key !== 'DEFAULT')
    .map((key) => key.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase())
    .join('-')

  return `--color-${name}`
}

/**
 * The variables for a set of theme colours, such as `{ '--color-brand-500': '#4bc485' }`.
 * Use it to theme an app at runtime with the names the preset writes.
 */
export function toColorVariables(colors: object): Record<string, string> {
  const result: Record<string, string> = {}

  walk(colors, [], (path, value) => {
    const name = colorVariable(path)

    if (!isFixed(name, value)) {
      result[name] = value
    }
  })

  return result
}

// the theme with each colour pointing at its variable
export function extendTheme(theme: Theme): Theme | undefined {
  if (!theme.colors) {
    return
  }

  const result = { ...theme, colors: toVariables(theme.colors) }

  originals.set(result, theme.colors)

  return result
}

// writes the colours on `:root`, and each of `themes` under its selector
export function colorPreflight(options: PresetOutloudOptions): Preflight<Theme> {
  return {
    getCSS({ theme }) {
      const colors = originals.get(theme)
      const blocks = colors ? [block(':root', toColorVariables(colors))] : []

      for (const [selector, set] of Object.entries(options.themes ?? {})) {
        const wrap = selector.startsWith('@')
        const css = set.colors ? block(wrap ? ':root' : selector, toColorVariables(set.colors)) : ''

        blocks.push(wrap && css ? `${selector}{${css}}` : css)
      }

      return blocks.filter(Boolean).join('\n') || undefined
    },
  }
}

function toVariables(colors: object, path: string[] = []): Colors {
  return Object.fromEntries(
    Object.entries(colors).map(([key, value]) => {
      if (typeof value === 'string') {
        const name = colorVariable([...path, key])

        return [key, isFixed(name, value) ? value : `var(${name})`]
      }

      return [key, value && typeof value === 'object' ? toVariables(value, [...path, key]) : value]
    }),
  ) as Colors
}

// a keyword, or the colour's own variable, which would point at itself
function isFixed(name: string, value: string): boolean {
  return keywordRE.test(value) || value.replace(/\s/g, '') === `var(${name})`
}

function walk(colors: object, path: string[], visit: (path: string[], value: string) => void): void {
  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === 'string') {
      visit([...path, key], value)
    } else if (value && typeof value === 'object') {
      walk(value, [...path, key], visit)
    }
  }
}

function block(selector: string, variables: Record<string, string>): string {
  const css = Object.entries(variables)
    .map(([name, value]) => `${name}:${value};`)
    .join('')

  return css ? `${selector}{${css}}` : ''
}
