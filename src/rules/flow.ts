import { e, type CSSObject, type Rule } from '@unocss/core'
import type { Theme } from '../theme.js'
import { toSize } from '../helpers.js'

export const flow: Rule<Theme>[] = [
  [
    /^flow$/, async (_, { rawSelector, theme }) => {
      // Inspired by [this video](https://www.youtube.com/watch?v=c13gpBrnGEw)

      const selector = rawSelector.startsWith('[') ? rawSelector : '.' + rawSelector

      const entries: [string, CSSObject][] = [
        [
          selector, {
            '--padding': toSize(theme.flow?.padding ?? 0),
            '--max-width': toSize(theme.flow?.maxWidth ?? 0),
            '--breakout-max-width': toSize(Math.max(theme.flow?.breakoutMaxWidth ?? 0, theme.flow?.maxWidth ?? 0)),
            '--breakout-size': `calc((var(--breakout-max-width) - var(--max-width)) / 2)`,
            'display': 'grid',
            'grid-template-columns': [
              '[full-width-start]',
              'minmax(var(--padding), 1fr)',
              '[breakout-start]',
              'minmax(0, var(--breakout-size))',
              '[content-start]',
              'min(100% - (var(--padding) * 2), var(--max-width))',
              '[content-end]',
              'minmax(0, var(--breakout-size))',
              '[breakout-end]',
              'minmax(var(--padding), 1fr)',
              '[full-width-end]',
            ].join(' '),
          },
        ],
        [`${selector} > *`, { 'grid-column': 'content' }],
        [`${selector} > [data-flow=breakout]`, { 'grid-column': 'breakout' }],
        [`${selector} > [data-flow=full-width]`, { 'grid-column': 'full-width' }],
      ]

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
