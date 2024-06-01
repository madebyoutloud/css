import type { CSSEntries, CSSObject, DynamicMatcher, Rule } from 'unocss'
import { theme } from '@outloud/css/src/theme'

interface ClassName {
  name: string
  properties: string[]
}

const shorthands: Record<string, any> = {
  num: [0, 1, 2, 3, 4, 5, 6, 8, 10, 20, 30, 40],
}

function mapProperties(properties: CSSObject | CSSEntries | string): string[] {
  if (Array.isArray(properties))
    return properties.map(([key, value]) => `${key}: ${value};`)

  if (typeof properties === 'object')
    return Object.keys(properties).map(key => `${key}: ${properties[key]};`)

  return []
}

function regexToClassName(regex: RegExp, args: any[] = []): string {
  let index = 0
  return regex.toString().replace(/^\/\^/, '').replace(/\$\/$/, '').replace(/\([^)]+\)/g, () => {
    return args[index++]
  })
}

function generateStaticClassName(rule: Rule) {
  return {
    name: rule[0] instanceof RegExp ? regexToClassName(rule[0]) : rule[0],
    properties: mapProperties(rule[1] as any),
  }
}

function generateDynamicClassName(rule: Rule, args: any[]) {
  return {
    name: rule[0] instanceof RegExp ? regexToClassName(rule[0], args) : rule[0],
    properties: mapProperties((rule[1] as DynamicMatcher)(['', ...args], { theme } as any) as any),
  }
}

function getAutocompleteValues(text: string): any[] {
  if (text.startsWith('<') && text.endsWith('>'))
    return shorthands[text.slice(1, -1)] ?? []

  if (text.startsWith('$')) {
    const themeValues = (theme as any)[text.slice(1)] ?? []

    return Array.isArray(themeValues) ? themeValues : Object.keys(themeValues)
  }

  return text.slice(1, -1).split('|')
}

function generateCombinations(args: any[]) {
  const r: any[] = []
  const max = args.length - 1

  function helper(arr: any[], i: number) {
    for (let j = 0, l = args[i].length; j < l; j++) {
      const a = arr.slice(0) // clone arr
      a.push(args[i][j])
      if (i === max)
        r.push(a)
      else
        helper(a, i + 1)
    }
  }

  helper([], 0)
  return r
}

export function generateRuleClassNames(rule: Rule): ClassName[] {
  if (typeof rule[1] !== 'function')
    return [generateStaticClassName(rule)]

  if (!rule[2]?.autocomplete)
    return []

  const autocomplete = Array.isArray(rule[2].autocomplete) ? rule[2].autocomplete : [rule[2].autocomplete]

  return autocomplete.map((name) => {
    const parts = name.match(/(\([^)]*\)|<(?:[^>]+)>|(?:\$\w+))/g)

    if (!parts)
      return []

    const combinations = generateCombinations(parts.map(getAutocompleteValues))

    return combinations.map(combination =>
      generateDynamicClassName(rule, combination),
    )
  }).flat(1).filter(item => item.properties.length > 0)
}
