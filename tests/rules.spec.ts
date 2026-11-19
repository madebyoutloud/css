import { grids as baseGrids } from '@unocss/preset-mini/rules'
import { describe, expect, test } from 'vitest'
import { declarations, generate } from './generate.js'

describe('flow', () => {
  test('default theme', async () => {
    const css = await generate('flow')

    expect(css).toContain('.flow{--un-padding:1rem;--un-max-width:56.25rem;--un-breakout-max-width:75rem;')
    expect(css).toContain(
      'grid-template-columns:[full-width-start] minmax(var(--un-padding), 1fr) [breakout-start] minmax(0, var(--un-breakout-size)) [content-start] min(100% - (var(--un-padding) * 2), var(--un-max-width)) [content-end] minmax(0, var(--un-breakout-size)) [breakout-end] minmax(var(--un-padding), 1fr) [full-width-end]',
    )
    expect(css).toContain('.flow > *{grid-column:content}')
    expect(css).toContain('.flow > [data-flow=breakout]{grid-column:breakout}')
    expect(css).toContain('.flow > [data-flow=full-width]{grid-column:full-width}')
  })

  test('breakout is at least as wide as the content', async () => {
    const css = await generate('flow', { theme: { flow: { maxWidth: 800, breakoutMaxWidth: 400, padding: 24 } } })

    expect(css).toContain('--un-padding:1.5rem;--un-max-width:50rem;--un-breakout-max-width:50rem;')
  })
})

describe('container', () => {
  test('default theme', async () => {
    const css = await generate('container')

    expect(css).toBe(
      '.container{--un-padding:1rem;--un-max-width:56.25rem;container-type:inline-size;width:100%;max-width:calc(var(--un-max-width) + (var(--un-padding) * 2));padding:var(--un-padding);margin-inline:auto}',
    )
  })

  test('sizes', async () => {
    const css = await generate('container', {
      theme: { container: { padding: '2rem', maxWidth: { default: 600, sm: 400 } } },
    })

    expect(css).toContain('.container{--un-padding:2rem;--un-max-width:37.5rem;')
    expect(css).toContain('.container[data-size=sm]{--un-max-width:25rem}')
  })
})

describe('grid', () => {
  test('columns', async () => {
    const css = await generate('columns')

    expect(css).toContain('.columns{display:grid;grid-template-columns:repeat(12, minmax(0, 1fr));gap:1rem}')
    expect(css).toContain('.columns > *{grid-column:span 12 / span 12}')
  })

  test('columns from the theme', async () => {
    const css = await generate('columns', { theme: { grid: { columns: 6, gap: 24 } } })

    expect(css).toContain('grid-template-columns:repeat(6, minmax(0, 1fr));gap:1.5rem')
  })

  test.each([
    ['col-6', 'grid-column:span 6 / span 6;'],
    ['offset-2', 'grid-column-start:2;'],
    ['grid-col-span-2', 'grid-column:span 2/span 2;'],
    ['grid-cols-3', 'grid-template-columns:repeat(3,minmax(0,1fr));'],
  ])('%s', async (className, expected) => {
    expect(await declarations(className)).toBe(expected)
  })
})

describe('utils', () => {
  test('pile', async () => {
    const css = await generate('pile')

    expect(css).toBe('.pile{display:grid;grid-template-areas:"pile";place-items:center}\n.pile > *{grid-area:pile}')
  })

  test('prose', async () => {
    const css = await generate('prose')

    expect(css).toBe('.prose > * + *{--un-gap:1em;margin-block-start:var(--un-gap)}')
  })

  test.each([
    ['flex-center', 'display:flex;justify-content:center;align-items:center;'],
    ['stack', 'display:flex;flex-direction:column;'],
    ['flex-content', 'flex:0 0 auto;'],
    ['flex-fill', 'flex:1 0 auto;'],
  ])('%s', async (className, expected) => {
    expect(await declarations(className)).toBe(expected)
  })
})

describe('values need a dash', () => {
  const dashless = ['w16', 'h1', 'min-w16', 'max-h16', 'm16', 'mx16', 'mt16', 'm-t16', 'p16', 'px16', 'ps16']
  const more = ['gap16', 'gap-x16', 'z10', 'op50', 'opacity50', 'bg-op50', 'text-op50', 'font700', 'fw700']

  test.each([...dashless, ...more])('%s generates nothing', async (className) => {
    expect(await generate(className)).toBe('')
  })

  test.each([
    ['w-16', 'width:1rem;'],
    ['h-1', 'height:0.0625rem;'],
    ['m-t-16', 'margin-top:1rem;'],
    ['mt-16', 'margin-top:1rem;'],
    ['gap-x-16', 'column-gap:1rem;'],
    ['z-10', 'z-index:10;'],
    ['op-50', 'opacity:0.5;'],
    ['bg-op-50', '--un-bg-opacity:0.5;'],
    ['fw-700', 'font-weight:700;'],
    ['m-auto', 'margin:auto;'],
  ])('%s', async (className, expected) => {
    expect(await declarations(className)).toBe(expected)
  })
})

describe('preset-mini stays as it is', () => {
  test('its row/col rule still takes col-span-*', () => {
    const rule = baseGrids.find(([matcher]) => String(matcher).includes('(row|col)'))

    expect(String(rule?.[0])).toBe(String(/^(?:grid-)?(row|col)-(.+)$/))
  })
})
