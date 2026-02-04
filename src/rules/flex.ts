import type { Rule } from '@unocss/core'
import type { Theme } from '@unocss/preset-mini'
import { flex as baseFlex } from '@unocss/preset-mini/rules'

export const flex: Rule<Theme>[] = [
  ...baseFlex,
  ['flex-content', { flex: '0 0 auto' }],
  ['flex-fill', { flex: '1 0 auto' }],

  [
    'flex-center', {
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center',
    },
  ],
]
