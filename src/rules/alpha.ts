import type { DynamicMatcher, Rule } from '@unocss/core'
import { h } from '@unocss/preset-mini/utils'
import type { Theme } from '../theme.js'
import { collect } from './helpers.js'

// the opacity after the last `/`, such as `50` in `bg-brand-500/50` or `[0.3]` in `text-text/[0.3]`
const opacityRE = /\/(\[[^\]]*\]|[^/[\]]+)$/
const variableRE = /var\(--color-[\w-]+\)/g

/**
 * Makes opacity work on theme colours, which are variables.
 *
 * preset-mini can't apply an alpha to `var()` and drops it, so `bg-brand-500/50` would render the full colour.
 * The wrapped rule's colour variables are mixed with transparent instead:
 * `color-mix(in srgb, var(--color-brand-500) 50%, transparent)`.
 */
export function alpha<T extends Theme>(rules: Rule<T>[]): Rule<T>[] {
  return rules.map((rule) => {
    const [matcher, handler, meta] = rule

    if (typeof matcher === 'string' || typeof handler !== 'function') {
      return rule
    }

    const wrapped = async (match: RegExpMatchArray, context: Parameters<DynamicMatcher<T>>[1]) => {
      const opacity = match[0].match(opacityRE)?.[1]
      const value = opacity ? h.bracket.cssvar.percent(opacity) : undefined
      const result = await collect(handler(match, context))

      return value ? mix(result, percentage(value)) : result
    }

    return (meta ? [matcher, wrapped, meta] : [matcher, wrapped]) as unknown as Rule<T>
  })
}

// `0.5` is `50%`, a variable is scaled by `calc()`
function percentage(value: string): string {
  const number = Number(value)

  return Number.isNaN(number) ? `calc(${value} * 100%)` : `${Math.round(number * 10000) / 100}%`
}

// the declarations of a rule's result, its keys untouched
function mix(result: unknown, amount: string): unknown {
  if (Array.isArray(result)) {
    // a `[property, value]` entry, or a list of results
    if (result.length === 2 && typeof result[0] === 'string') {
      return [result[0], mixValue(result[1], amount)]
    }

    return result.map((item) => mix(item, amount))
  }

  if (result && typeof result === 'object') {
    return Object.fromEntries(Object.entries(result).map(([key, value]) => [key, mixValue(value, amount)]))
  }

  return result
}

function mixValue(value: unknown, amount: string): unknown {
  if (typeof value !== 'string' || value.includes('color-mix(')) {
    return value
  }

  return value.replace(variableRE, (variable) => `color-mix(in srgb, ${variable} ${amount}, transparent)`)
}
