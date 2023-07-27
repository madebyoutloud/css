import type { Rule, RuleContext } from '@unocss/core'
import { convertSize } from '../utils/helpers'
import type { Theme } from '../theme'

export const fontSize: Rule[] = [
  [/^fs-(\d+)$/, ([_, v], { theme }) => ({ 'font-size': convertSize(v, theme) }), { autocomplete: 'fs-<num>' }],
]

export const fontStyle = [
  ['italic', { 'font-style': 'italic' }],
  ['not-italic', { 'font-style': 'normal' }],
]

export const fontWeight: Rule<Theme>[] = [
  [/^fw-(\d+)$/, ([_, v], { theme }) => {
    if (theme.weight?.includes(Number(v)))
      return { 'font-weight': v }
  }, { autocomplete: ['fw-$weight'] }],
]

export const textAlign: Rule[] = ['center', 'left', 'right', 'justify', 'start', 'end'].map(v => [`text-${v}`, { 'text-align': v }])

export const verticalAlign: Rule[] = ['baseline', 'top', 'middle', 'bottom', 'bottom', 'text-top', 'text-bottom', 'sub', 'super'].map(v => [`align-${v}`, { 'vertical-align': v }])

export const textTransform: Rule[] = [
  ['uppercase', { 'text-transform': 'uppercase' }],
  ['lowercase', { 'text-transform': 'lowercase' }],
  ['capitalize', { 'text-transform': 'capitalize' }],
  ['normal-case', { 'text-transform': 'none' }],
]

export const textDecoration: Rule[] = [
  ['underline', { 'text-decoration-line': 'underline' }],
  ['overline', { 'text-decoration-line': 'overline' }],
  ['line-through', { 'text-decoration-line': 'line-through' }],
  ['no-underline', { 'text-decoration-line': 'none' }],
]

export const textOverflow: Rule[] = [
  ['truncate', { 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }],
  ['text-ellipsis', { 'text-overflow': 'ellipsis' }],
  ['text-clip', { 'text-overflow': 'clip' }],
]

export const textColor: Rule[] = [
  [/^text-(.+)$/, ([_, v], { theme }: RuleContext<Theme>) => {
    const colorValue = theme.colors?.[v]

    if (colorValue)
      return { color: colorValue }
  }, { autocomplete: 'text-$colors' }],
]

const whitespaces = ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces']
export const whitespace: Rule[] = [
  [
    /^whitespace-([-\w]+)$/,
    ([, v]) => {
      if (whitespaces.includes(v))
        return { 'white-space': v }
    },
    { autocomplete: `whitespace-(${whitespaces.join('|')})` },
  ],
]
