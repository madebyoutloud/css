import type { Rule } from '@unocss/core'

export const flex: Rule[] = [
  ['flex-1', { flex: '1 1 0%' }],
  ['flex-auto', { flex: '1 1 auto' }],
  ['flex-initial', { flex: '0 1 auto' }],
  ['flex-content', { flex: '0 0 auto' }],
  ['flex-fill', { flex: '1 0 auto' }],
  ['flex-none', { flex: 'none' }],
]

export const flexDirections: Rule[] = [
  ['row', { 'flex-direction': 'row' }],
  ['row-reverse', { 'flex-direction': 'row-reverse' }],
  ['col', { 'flex-direction': 'column' }],
  ['col-reverse', { 'flex-direction': 'column-reverse' }],
]

export const flexWraps: Rule[] = [
  ['wrap', { 'flex-wrap': 'wrap' }],
  ['wrap-reverse', { 'flex-wrap': 'wrap-reverse' }],
  ['nowrap', { 'flex-wrap': 'nowrap' }],
]

export const flexGrows: Rule[] = [
  ['grow', { 'flex-grow': '1' }],
  ['grow-0', { 'flex-grow': '0' }],
]

export const flexShrinks: Rule[] = [
  ['shrink', { 'flex-shrink': '1' }],
  ['shrink-0', { 'flex-shrink': '0' }],
]
