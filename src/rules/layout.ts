import type { Rule } from '@unocss/core'

export const displays: Rule[] = [
  ['block', { display: 'block' }],
  ['inline-block', { display: 'inline-block' }],
  ['inline', { display: 'inline' }],
  ['flex', { display: 'flex' }],
  ['inline-flex', { display: 'inline-flex' }],
  ['grid', { display: 'grid' }],
  ['inline-grid', { display: 'inline-grid' }],
  ['hidden', { display: 'none' }],
]

export const aspectRatios: Rule[] = [
  ['aspect-square', { 'aspect-ratio': '1 / 1' }],
  ['aspect-video', { 'aspect-ratio': 'video' }],
]

export const isolation: Rule[] = [
  ['isolate', { isolation: 'isolate' }],
]

export const objectFits: Rule[] = [
  'contain',
  'cover',
  'fill',
  'none',
  'scale-down',
].map(v => [`object-${v}`, { 'object-fit': v }])

export const overflows: Rule[] = [
  'auto',
  'hidden',
  'clip',
  'visible',
  'scroll',
].map(v => [`overflow-${v}`, { overflow: v }])

export const positions: Rule[] = [
  'static',
  'fixed',
  'absolute',
  'relative',
  'sticky',
].map(v => [v, { position: v }])

const zIndexValues = [0, 10, 20, 30, 40, 50]
export const zIndex: Rule[] = [
  [/^z-(\d+)$/, ([_, v]) => {
    if (zIndexValues.includes(Number(v)))
      return { 'z-index': v }
  }],
]
