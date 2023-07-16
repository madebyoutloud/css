import type { Shortcut } from '@unocss/core'
import type { Theme } from '../theme'

export const shortcuts: Shortcut<Theme>[] = [
  [/^columns$/, (_, { theme }) => `grid grid-cols-${theme.grid?.columns} gap-${theme.grid?.gap}`],
  ['flex-center', ' justify-center items-center'],
]
