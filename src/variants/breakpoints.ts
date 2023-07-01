import type { VariantObject } from '@unocss/core'
import type { Theme } from '../theme'
import type { OutloudOptions } from '..'

export function calcMaxWidthBySize(size: string) {
  const value = size.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || ''
  const unit = size.slice(value.length)
  const maxWidth = (Number.parseFloat(value) - 0.1)
  return Number.isNaN(maxWidth) ? size : `${maxWidth}${unit}`
}

export function variantBreakpoints(options: OutloudOptions): VariantObject<Theme> {
  const regexCache: Record<string, RegExp> = {}
  const separators = options.separators!.join('|')

  return {
    name: 'breakpoints',
    match(matcher, context) {
      const variantEntries: Array<[string, string, number]>
      = Object.entries(context.theme.breakpoints ?? {}).map(([point, size], idx) => [point, size, idx])
      for (const [point, size, idx] of variantEntries) {
        if (!regexCache[point])
          regexCache[point] = new RegExp(`((?:${separators})${point}(?:-(down|only))?)$`)

        const match = matcher.match(regexCache[point])
        if (!match)
          continue

        const [, post] = match

        const m = matcher.slice(0, matcher.length - post.length)
        // container rule is responsive, but also is breakpoint aware
        // it is handled on its own module (container.ts) and so we
        // exclude it from here
        if (m === 'container')
          continue

        const isLtPrefix = post.endsWith('-down')
        const isAtPrefix = post.endsWith('-only')

        let order = 1000 // parseInt(size)

        if (isLtPrefix) {
          order -= (idx + 1)
          return {
            matcher: m,
            handle: (input, next) => next({
              ...input,
              parent: `${input.parent ? `${input.parent} $$ ` : ''}@media (max-width: ${calcMaxWidthBySize(size)})`,
              parentOrder: order,
            }),
          }
        }

        order += (idx + 1)

        // support for windicss @<breakpoint> => last breakpoint will not have the upper bound
        if (isAtPrefix && idx < variantEntries.length - 1) {
          return {
            matcher: m,
            handle: (input, next) => next({
              ...input,
              parent: `${input.parent ? `${input.parent} $$ ` : ''}@media (min-width: ${size}) and (max-width: ${calcMaxWidthBySize(variantEntries[idx + 1][1])})`,
              parentOrder: order,
            }),
          }
        }

        return {
          matcher: m,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} $$ ` : ''}@media (min-width: ${size})`,
            parentOrder: order,
          }),
        }
      }
    },
    multiPass: true,
    autocomplete: '@$breakpoints(-down|-only|)',
  }
}
