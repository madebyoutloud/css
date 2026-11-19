import type { DynamicMatcher, Rule } from '@unocss/core'
import { toRem } from '../helpers.js'
import type { Theme } from '../theme.js'
import { collect } from './helpers.js'

// the last `-` segment, such as `16` in `p-16` or `16/24` in `text-16/24`
const tailRE = /^(.*-)([^-]+)$/
const numberRE = /^\d*\.?\d+$/
const remRE = /\drem\b/

/**
 * Makes bare numbers px: `p-16` is 16px, written as `1rem`.
 *
 * preset-mini reads a bare number as a quarter rem (`p-16` is `4rem`). The wrapped rule runs again with the
 * number as a bracket value (`p-[1rem]`), but only when its own output is in rem, so theme keys such as
 * `text-base` and unitless numbers such as `z-10` or `font-700` stay as they are.
 */
export function px<T extends Theme>(rules: Rule<T>[]): Rule<T>[] {
  return rules.map((rule) => {
    const [matcher, handler, meta] = rule

    if (typeof matcher === 'string' || typeof handler !== 'function') {
      return rule
    }

    const wrapped = async (match: RegExpMatchArray, context: Parameters<DynamicMatcher<T>>[1]) => {
      const result = await collect(handler(match, context))
      const rewritten = rewrite(match[0])

      if (!rewritten || !remRE.test(stringify(result))) {
        return result
      }

      const next = rewritten.match(matcher)

      return next ? collect(handler(next, context)) : result
    }

    return (meta ? [matcher, wrapped, meta] : [matcher, wrapped]) as unknown as Rule<T>
  })
}

function rewrite(input: string): string | undefined {
  const [, head, tail] = input.match(tailRE) ?? []

  if (!head || !tail) {
    return
  }

  const parts = tail.split('/')

  if (!parts.some((part) => numberRE.test(part))) {
    return
  }

  return head + parts.map((part) => (numberRE.test(part) ? `[${toRem(Number(part))}]` : part)).join('/')
}

function stringify(value: unknown): string {
  return typeof value === 'string' ? value : (JSON.stringify(value) ?? '')
}
