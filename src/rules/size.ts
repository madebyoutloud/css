import type { CSSEntries, DynamicMatcher, Rule, RuleContext } from '@unocss/core'
import type { Theme } from '../theme'
import { convertSize } from '../utils/helpers'

const widthValues: Record<string, string[]> = {
  full: ['100%'],
  screen: ['100vw', '100dvw'],
  min: ['min-content'],
  max: ['max-content'],
  fit: ['fit-content'],
  dvw: ['100dvw'],
  svw: ['100lvw'],
  lvw: ['100lvw'],
  auto: ['auto'],
}

const heightValues: Record<string, string[]> = {
  full: ['100%'],
  screen: ['100vh', '100dvh'],
  min: ['min-content'],
  max: ['max-content'],
  fit: ['fit-content'],
  dvh: ['100dvh'],
  svh: ['100lvh'],
  lvh: ['100lvh'],
  auto: ['auto'],
}

export const width: Rule[] = [
  ...Object.keys(widthValues).map<Rule>((key) => {
    return [`w-${key}`, widthValues[key].map(v => ['width', v]) as CSSEntries]
  }),
  [/^w-(\d+)$/, handle('width'), { autocomplete: ['w-<num>'] }],
]

export const minWidth: Rule[] = [
  ...Object.keys(widthValues).map<Rule>((key) => {
    return [`min-w-${key}`, widthValues[key].map(v => ['min-width', v]) as CSSEntries]
  }),
  [/^min-w-(\d+)$/, handle('min-width'), { autocomplete: ['min-w-<num>'] }],
]

export const maxWidth: Rule[] = [
  ...Object.keys(widthValues).map<Rule>((key) => {
    return [`max-w-${key}`, widthValues[key].map(v => ['max-width', v]) as CSSEntries]
  }),
  [/^max-w-(\d+)$/, handle('max-width'), { autocomplete: ['max-w-<num>'] }],
]

export const height: Rule[] = [
  ...Object.keys(heightValues).map<Rule>((key) => {
    return [`h-${key}`, heightValues[key].map(v => ['height', v]) as CSSEntries]
  }),
  [/^h-(\d+)$/, handle('height'), { autocomplete: ['h-<num>'] }],
]

export const minHeight: Rule[] = [
  ...Object.keys(heightValues).map<Rule>((key) => {
    return [`min-h-${key}`, heightValues[key].map(v => ['min-height', v]) as CSSEntries]
  }),
  [/^min-h-(\d+)$/, handle('min-height'), { autocomplete: ['min-h-<num>'] }],
]

export const maxHeight: Rule[] = [
  ...Object.keys(heightValues).map<Rule>((key) => {
    return [`max-h-${key}`, heightValues[key].map(v => ['max-height', v]) as CSSEntries]
  }),
  [/^max-h-(\d+)$/, handle('max-height'), { autocomplete: ['max-h-<num>'] }],
]

function handle(property: string): DynamicMatcher {
  return ([_, v]: string[], { theme }: RuleContext<Theme>): CSSEntries | undefined => {
    return [[property, convertSize(v, theme)]]
  }
}
