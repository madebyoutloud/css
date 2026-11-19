import type { CSSObject, DynamicMatcher } from '@unocss/core'

export function entriesToCss(entries: [string, CSSObject][]): string {
  return entries
    .map(([ruleSelector, props]) => {
      const style = Object.entries(props)
        .map(([key, value]) => `${key}:${value}`)
        .join(';')

      return `${ruleSelector}{${style}}`
    })
    .join('\n')
}

// generator rules yield their values, read them once so the result can be checked and returned
export async function collect(result: ReturnType<DynamicMatcher>): Promise<unknown> {
  const value: unknown = await result

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return value
  }

  if (Symbol.asyncIterator in value) {
    return fromAsync(value as AsyncIterable<unknown>)
  }

  if (Symbol.iterator in value) {
    return Array.from(value as Iterable<unknown>).filter(Boolean)
  }

  return value
}

async function fromAsync(values: AsyncIterable<unknown>): Promise<unknown[]> {
  const result: unknown[] = []

  for await (const value of values) {
    if (value) {
      result.push(value)
    }
  }

  return result
}
