import type { PresetMiniOptions } from '@unocss/preset-mini'
import type { Theme } from './theme.js'

export interface PresetOutloudOptions extends PresetMiniOptions {
  /**
   * Colour sets that override the theme's colours under a selector, such as dark mode or a client's brand.
   * A key starting with `@` wraps `:root`: `'@media (prefers-color-scheme: dark)'`.
   *
   * @example { '.dark': { colors: { background: '#0a0a0a' } } }
   */
  themes?: Record<string, { colors?: Theme['colors'] }>
}
