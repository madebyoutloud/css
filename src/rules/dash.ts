import type { Rule } from '@unocss/core'
import type { Theme } from '../theme.js'

// an optional dash right before the value, as in `^m-?([rltbse])(?:-?(.+))?$` or `^gap-?()(.+)$`
const optionalDashRE = /-\?(?=(?:\(\))?\((?:\.\+|\[\^-\]\+)\))/g

// `z10`, preset-mini's only rule that takes a value with no dash at all
const dashlessRules = new Set([String(/^(?:position-|pos-)?z([\d.]+)$/)])

/**
 * Requires a dash before values: `w-16`, `m-16`, `z-10` and `op-50` work, `w16`, `m16`, `z10` and `op50` don't.
 * Keeps classes such as `h1` free for the project's own CSS.
 */
export function requireDash<T extends Theme>(rules: Rule<T>[]): Rule<T>[] {
  return rules
    .filter(([matcher]) => !dashlessRules.has(String(matcher)))
    .map((rule) => {
      const [matcher, ...rest] = rule

      if (typeof matcher === 'string') {
        return rule
      }

      const source = matcher.source.replace(optionalDashRE, '-')

      // a new rule, preset-mini's own stays as it is
      return source === matcher.source ? rule : ([new RegExp(source, matcher.flags), ...rest] as Rule<T>)
    })
}
