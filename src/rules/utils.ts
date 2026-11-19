import type { Rule } from '@unocss/core'
import type { Theme } from '@unocss/preset-mini'
import { entriesToCss } from './helpers.js'

// https://www.youtube.com/watch?v=CU8Plk-53RU

export const utils: Rule<Theme>[] = [
  [
    /^prose$/,
    (_, { rawSelector }) => {
      const selector = rawSelector.startsWith('[') ? rawSelector : '.' + rawSelector

      return entriesToCss([
        [
          `${selector} > * + *`,
          {
            '--un-gap': '1em',
            'margin-block-start': `var(--un-gap)`,
          },
        ],
      ])
    },
  ],

  [
    /^pile$/,
    (_, { rawSelector }) => {
      const selector = rawSelector.startsWith('[') ? rawSelector : '.' + rawSelector

      return entriesToCss([
        [
          selector,
          {
            'display': 'grid',
            'grid-template-areas': '"pile"',
            'place-items': 'center',
          },
        ],
        [
          `${selector} > *`,
          {
            'grid-area': 'pile',
          },
        ],
      ])
    },
  ],
]
