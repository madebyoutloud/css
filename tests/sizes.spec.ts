import { describe, expect, test } from 'vitest'
import { declarations, generate } from './generate.js'

describe('bare numbers are px', () => {
  test.each([
    ['p-16', 'padding:1rem;'],
    ['px-2.5', 'padding-left:0.15625rem;padding-right:0.15625rem;'],
    ['mt-8', 'margin-top:0.5rem;'],
    ['-m-4', 'margin:-0.25rem;'],
    ['gap-24', 'gap:1.5rem;'],
    ['gap-x-8', 'column-gap:0.5rem;'],
    ['w-16', 'width:1rem;'],
    ['h-16', 'height:1rem;'],
    ['size-16', 'width:1rem;height:1rem;'],
    ['min-w-16', 'min-width:1rem;'],
    ['max-w-16', 'max-width:1rem;'],
    ['inset-4', 'inset:0.25rem;'],
    ['-top-4', 'top:-0.25rem;'],
    ['fs-16', 'font-size:1rem;'],
    ['text-16', 'font-size:1rem;'],
    ['text-16/24', 'font-size:1rem;line-height:1.5rem;'],
    ['text-16/tight', 'font-size:1rem;line-height:1.25;'],
    ['leading-24', 'line-height:1.5rem;'],
    ['rounded-4', 'border-radius:0.25rem;'],
    ['indent-4', 'text-indent:0.25rem;'],
    ['basis-16', 'flex-basis:1rem;'],
    ['tracking-1', 'letter-spacing:0.0625rem;'],
  ])('%s', async (className, expected) => {
    expect(await declarations(className)).toBe(expected)
  })

  test('translate', async () => {
    expect(await declarations('translate-x-4')).toContain('--un-translate-x:0.25rem;')
  })
})

describe('theme sizes are as preset-mini defines them', () => {
  test.each([
    ['text-base', 'font-size:1rem;line-height:1.5rem;'],
    ['text-lg', 'font-size:1.125rem;line-height:1.75rem;'],
    ['rounded', 'border-radius:0.25rem;'],
    ['rounded-lg', 'border-radius:0.5rem;'],
    ['max-w-md', 'max-width:28rem;'],
    ['leading-tight', 'line-height:1.25;'],
    ['fs-lg', 'font-size:1.125rem;'],
  ])('%s', async (className, expected) => {
    expect(await declarations(className)).toBe(expected)
  })

  test('a project theme in rem', async () => {
    const theme = { fontSize: { body: ['1.25rem', '2rem'] as [string, string] }, borderRadius: { card: '0.75rem' } }

    expect(await declarations('text-body', { theme })).toBe('font-size:1.25rem;line-height:2rem;')
    expect(await declarations('rounded-card', { theme })).toBe('border-radius:0.75rem;')
  })
})

describe('other values', () => {
  test.each([
    ['w-1/2', 'width:50%;'],
    ['p-[10px]', 'padding:10px;'],
    ['p-10px', 'padding:10px;'],
    ['p-0', 'padding:0;'],
    ['border-2', 'border-width:2px;'],
    ['outline-offset-2', 'outline-offset:2px;'],
    ['font-700', 'font-weight:700;'],
    ['z-10', 'z-index:10;'],
    ['opacity-50', 'opacity:0.5;'],
    ['flex-1', 'flex:1 1 0%;'],
    ['w-screen-md', 'width:768px;'],
  ])('%s', async (className, expected) => {
    expect(await declarations(className)).toBe(expected)
  })
})

describe('variants and prefix', () => {
  test('variants', async () => {
    const css = await generate(['md:p-16', 'hover:-m-4', '!gap-24'])

    expect(css).toContain('.hover\\:-m-4:hover{margin:-0.25rem;}')
    expect(css).toContain('.\\!gap-24{gap:1.5rem !important;}')
    expect(css).toMatch(/@media \(min-width: 768px\)\{\n\.md\\:p-16\{padding:1rem;\}/)
  })

  test('prefix', async () => {
    const css = await generate(['o-p-16', 'o-text-base', 'p-16'], { prefix: 'o-' })

    expect(css).toContain('.o-p-16{padding:1rem;}')
    expect(css).toContain('.o-text-base{font-size:1rem;line-height:1.5rem;}')
    expect(css).not.toContain('.p-16')
  })
})
