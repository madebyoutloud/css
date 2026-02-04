import type { CSSObject } from '@unocss/core'

export function entriesToCss(entries: [string, CSSObject][]) {
  return entries.map(([ruleSelector, props]) => {
    const style = Object.entries(props)
      .map(([key, value]) => `${key}:${value}`)
      .join(';')

    return `${ruleSelector}{${style}}`
  })
    .join('\n')
}
