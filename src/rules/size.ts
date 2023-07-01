import type { CSSEntries, Rule } from '@unocss/core'

const width: Record<string, string[]> = {
  full: ['100%'],
  screen: ['100vw', '100dvw'],
  min: ['min-content'],
  max: ['max-content'],
  fit: ['fit-content'],
}

const height: Record<string, string[]> = {
  full: ['100%'],
  screen: ['100vh', '100dvh'],
  min: ['min-content'],
  max: ['max-content'],
  fit: ['fit-content'],
}

export const widths: Rule[] = Object.keys(width).map((key) => {
  return [`w-${key}`, width[key].map(v => ['width', v]) as CSSEntries]
})

export const minWidths: Rule[] = Object.keys(width).map((key) => {
  return [`min-w-${key}`, width[key].map(v => ['min-width', v]) as CSSEntries]
})

export const maxWidths: Rule[] = Object.keys(width).map((key) => {
  return [`max-w-${key}`, width[key].map(v => ['max-width', v]) as CSSEntries]
})

export const heights: Rule[] = Object.keys(height).map((key) => {
  return [`h-${key}`, height[key].map(v => ['height', v]) as CSSEntries]
})

export const minHeights: Rule[] = Object.keys(height).map((key) => {
  return [`min-h-${key}`, height[key].map(v => ['min-height', v]) as CSSEntries]
})

export const maxHeights: Rule[] = Object.keys(height).map((key) => {
  return [`max-h-${key}`, height[key].map(v => ['max-height', v]) as CSSEntries]
})
