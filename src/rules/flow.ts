import type { Rule } from '@unocss/core'
import type { Theme } from '../theme.js'
import { toSize } from '../helpers.js'
import { entriesToCss } from './helpers.js'

export const flow: Rule<Theme>[] = [
  [
    /^flow$/, async (_, { rawSelector, theme }) => {
      // Inspired by [this video](https://www.youtube.com/watch?v=c13gpBrnGEw)

      const selector = rawSelector.startsWith('[') ? rawSelector : '.' + rawSelector

      return entriesToCss([
        [
          selector, {
            '--un-padding': toSize(theme.flow?.padding ?? 0),
            '--un-max-width': toSize(theme.flow?.maxWidth ?? 0),
            '--un-breakout-max-width': toSize(Math.max(theme.flow?.breakoutMaxWidth ?? 0, theme.flow?.maxWidth ?? 0)),
            '--un-breakout-size': `calc((var(--un-breakout-max-width) - var(--un-max-width)) / 2)`,
            'display': 'grid',
            'grid-template-columns': [
              '[full-width-start]',
              'minmax(var(--un-padding), 1fr)',
              '[breakout-start]',
              'minmax(0, var(--un-breakout-size))',
              '[content-start]',
              'min(100% - (var(--un-padding) * 2), var(--un-max-width))',
              '[content-end]',
              'minmax(0, var(--un-breakout-size))',
              '[breakout-end]',
              'minmax(var(--un-padding), 1fr)',
              '[full-width-end]',
            ].join(' '),
          },
        ],
        [`${selector} > *`, { 'grid-column': 'content' }],
        [`${selector} > [data-flow=breakout]`, { 'grid-column': 'breakout' }],
        [`${selector} > [data-flow=full-width]`, { 'grid-column': 'full-width' }],
      ])
    },
  ],
]
