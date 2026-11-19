import type { Rule } from '@unocss/core'
import {
  flex as baseFlex,
  fonts as baseFonts,
  grids as baseGrids,
  rules as miniRules,
  sizes,
} from '@unocss/preset-mini/rules'
import type { Theme } from '../theme.js'
import { container } from './container.js'
import { requireDash } from './dash.js'
import { flex } from './flex.js'
import { flow } from './flow.js'
import { grids } from './grid.js'
import { px } from './px.js'
import { fonts } from './typography.js'
import { utils } from './utils.js'

// preset-mini's rules are typed with its own Theme, ours extends it
const mini = (group: unknown): Rule<Theme>[] => group as Rule<Theme>[]

// preset-mini's groups that ours replace, in place, so new preset-mini rules arrive on their own
const overrides = new Map<Rule<Theme>[], Rule<Theme>[]>([
  [mini(baseGrids), grids],
  [mini(sizes), [...flow, ...container, ...mini(sizes)]],
  [mini(baseFlex), [...mini(flex), ...mini(utils)]],
  [mini(baseFonts), mini(fonts)],
])

export const rules: Rule<Theme>[] = px(requireDash(withOverrides(mini(miniRules))))

function withOverrides(base: Rule<Theme>[]): Rule<Theme>[] {
  const groups = [...overrides.keys()]
  const applied = new Set<Rule<Theme>[]>()
  const result: Rule<Theme>[] = []

  for (const rule of base) {
    const group = groups.find((item) => item.includes(rule))

    if (!group) {
      result.push(rule)
    } else if (!applied.has(group)) {
      applied.add(group)
      result.push(...overrides.get(group)!)
    }
  }

  // a group preset-mini renamed or dropped would silently lose our rules
  if (applied.size !== groups.length) {
    throw new Error('@outloud/css: preset-mini no longer has a rule group this preset replaces')
  }

  return result
}
