import type { CSSEntries, Rule } from '@unocss/core'

const widthValues: Record<string, string[]> = {
  full: ['100%'],
  screen: ['100vw', '100dvw'],
  min: ['min-content'],
  max: ['max-content'],
  fit: ['fit-content'],
}

const heightValues: Record<string, string[]> = {
  full: ['100%'],
  screen: ['100vh', '100dvh'],
  min: ['min-content'],
  max: ['max-content'],
  fit: ['fit-content'],
}

export const width: Rule[] = Object.keys(widthValues).map((key) => {
  return [`w-${key}`, widthValues[key].map(v => ['width', v]) as CSSEntries]
})

export const minWidth: Rule[] = Object.keys(widthValues).map((key) => {
  return [`min-w-${key}`, widthValues[key].map(v => ['min-width', v]) as CSSEntries]
})

export const maxWidth: Rule[] = Object.keys(widthValues).map((key) => {
  return [`max-w-${key}`, widthValues[key].map(v => ['max-width', v]) as CSSEntries]
})

export const height: Rule[] = Object.keys(heightValues).map((key) => {
  return [`h-${key}`, heightValues[key].map(v => ['height', v]) as CSSEntries]
})

export const minHeight: Rule[] = Object.keys(heightValues).map((key) => {
  return [`min-h-${key}`, heightValues[key].map(v => ['min-height', v]) as CSSEntries]
})

export const maxHeight: Rule[] = Object.keys(heightValues).map((key) => {
  return [`max-h-${key}`, heightValues[key].map(v => ['max-height', v]) as CSSEntries]
})
