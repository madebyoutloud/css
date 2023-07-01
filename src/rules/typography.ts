import type { Rule } from '@unocss/core'
import { convertSize } from '../utils/helpers'

export const fontSize: Rule[] = [
  [/^fs-(\d+)$/, ([_, v], { theme }) => ({ 'font-size': convertSize(v, theme) })],
]

const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900]
export const fontWeight: Rule[] = [
  [/^fw-(\d+)$/, ([_, v]) => {
    if (weights.includes(Number(v)))
      return { 'font-weight': v }
  }],
]

export const textAligns: Rule[] = ['center', 'left', 'right', 'justify', 'start', 'end'].map(v => [`text-${v}`, { 'text-align': v }])

export const verticalAligns: Rule[] = ['baseline', 'top', 'middle', 'bottom', 'bottom', 'text-top', 'text-bottom', 'sub', 'super'].map(v => [`align-${v}`, { 'vertical-align': v }])

export const textTransforms: Rule[] = [
  ['uppercase', { 'text-transform': 'uppercase' }],
  ['lowercase', { 'text-transform': 'lowercase' }],
  ['capitalize', { 'text-transform': 'capitalize' }],
  ['normal-case', { 'text-transform': 'none' }],
]

export const textDecorations: Rule[] = [
  ['underline', { 'text-decoration-line': 'underline' }],
  ['overline', { 'text-decoration-line': 'overline' }],
  ['line-through', { 'text-decoration-line': 'line-through' }],
  ['no-underline', { 'text-decoration-line': 'none' }],
]

export const textOverflows: Rule[] = [
  ['truncate', { 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }],
  ['text-ellipsis', { 'text-overflow': 'ellipsis' }],
  ['text-clip', { 'text-overflow': 'clip' }],
]
