import type { DynamicShortcut } from '@unocss/core'
import type { Theme } from '../theme'

export const shortcuts: DynamicShortcut<Theme>[] = [
  [/^columns$/, (_, { theme }) => `grid grid-cols-${theme.grid?.columns} gap-${theme.grid?.gap}`],
]
