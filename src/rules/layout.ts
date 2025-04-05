import type { CSSEntries, Rule, RuleContext } from '@unocss/core'
import type { Theme } from '../theme'
import { convertSize } from '../utils/helpers'
import { directionMap } from '../utils/mappings'

export const aspectRatio: Rule[] = [
  ['aspect-square', { 'aspect-ratio': '1 / 1' }],
  ['aspect-video', { 'aspect-ratio': '16 / 9' }],
]

export const display: Rule[] = [
  ['block', { display: 'block' }],
  ['inline-block', { display: 'inline-block' }],
  ['inline', { display: 'inline' }],
  ['flex', { display: 'flex' }],
  ['inline-flex', { display: 'inline-flex' }],
  ['grid', { display: 'grid' }],
  ['inline-grid', { display: 'inline-grid' }],
  ['hidden', { display: 'none' }],
]

export const isolation: Rule[] = [
  ['isolate', { isolation: 'isolate' }],
]

export const objectFit: Rule[] = [
  'contain',
  'cover',
  'fill',
  'none',
  'scale-down',
].map(v => [`object-${v}`, { 'object-fit': v }])

export const overflow: Rule[] = [
  'auto',
  'hidden',
  'clip',
  'visible',
  'scroll',
].map(v => [`overflow-${v}`, { overflow: v }])

export const position: Rule[] = [
  'static',
  'fixed',
  'absolute',
  'relative',
  'sticky',
].map(v => [v, { position: v }])

export const inset: Rule[] = [
  [/^inset-(.+)$/, ([, v], ctx) => ({ inset: handleInsetValue(v, ctx) }),    { autocomplete: 'inset-<num>' }  ],
  [/^inset-([xy])-(.+)$/, handleInsetValues, { autocomplete: 'inset-(x|y)-<num>' }],
  [/^(top|left|right|bottom)-(.+)$/, ([, d, v], ctx) => ({ [d]: handleInsetValue(v, ctx) }), { autocomplete: '(top|left|right|bottom)-<num>' }],
]

export const visibility: Rule[] = [
  ['visible', { visibility: 'visible' }],
  ['invisible', { visibility: 'hidden' }],
  ['collapse', { visibility: 'collapse' }],
]

export const zIndex: Rule[] = [
  [/^z-(\d+)$/, ([_, v]) => ({ 'z-index': v }), { autocomplete: 'z-<num>' }],
  [/^-z-(\d+)$/, ([_, v]) => ({ 'z-index': `-${v}` }), { autocomplete: '-z-<num>' }],
]

function handleInsetValue(v: string, { theme }: RuleContext<Theme>): string | number | undefined {
  return convertSize(v, theme)
}

function handleInsetValues([, d, v]: string[], { theme }: RuleContext<Theme>): CSSEntries | undefined {
  return directionMap[d].map(i => [i.slice(1), convertSize(v, theme)])
}
