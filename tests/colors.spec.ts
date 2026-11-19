import { describe, expect, test } from 'vitest'
import { colorVariable, toColorVariables } from '../src/helpers.js'
import { declarations, generate } from './generate.js'

const theme = {
  colors: {
    brand: { 500: '#4bc485' },
    primary: { DEFAULT: 'var(--color-brand-500)', text: '#fff' },
    text: { DEFAULT: '#171717', secondary: '#404040' },
    surface: { cardBg: '#eee' },
  },
}

describe('colour variables', () => {
  test('the theme colours are written on :root', async () => {
    const css = await generate([], { theme, preflights: true, preflight: false })

    expect(css).toBe(
      ':root{--color-black:#000;--color-white:#fff;--color-brand-500:#4bc485;--color-primary:var(--color-brand-500);' +
        '--color-primary-text:#fff;--color-text:#171717;--color-text-secondary:#404040;--color-surface-card-bg:#eee;}',
    )
  })

  test('utilities use the variables', async () => {
    expect(await declarations('bg-brand-500', { theme })).toBe('background-color:var(--color-brand-500);')
    expect(await declarations('bg-primary', { theme })).toBe('background-color:var(--color-primary);')
    expect(await declarations('color-text', { theme })).toBe('color:var(--color-text);')
    expect(await declarations('color-text-secondary', { theme })).toBe('color:var(--color-text-secondary);')
    expect(await declarations('bg-surface-card-bg', { theme })).toBe('background-color:var(--color-surface-card-bg);')
  })

  test('keywords stay as they are', async () => {
    expect(await declarations('bg-transparent')).toBe('background-color:transparent;')
    expect(await declarations('c-current')).toBe('color:currentColor;')
  })

  test("preset-mini's palette is not included", async () => {
    expect(await generate('bg-red-500')).toBe('')
  })

  test('themes override the colours under their selector', async () => {
    const css = await generate([], {
      theme,
      preflights: true,
      preflight: false,
      themes: {
        '.dark': { colors: { text: { DEFAULT: '#fafafa' } } },
        '[data-client="acme"]': { colors: { brand: { 500: '#ff3712' } } },
        '@media (prefers-color-scheme: dark)': { colors: { primary: '#000' } },
      },
    })

    expect(css).toContain('\n.dark{--color-text:#fafafa;}')
    expect(css).toContain('\n[data-client="acme"]{--color-brand-500:#ff3712;}')
    expect(css).toContain('\n@media (prefers-color-scheme: dark){:root{--color-primary:#000;}}')
  })
})

describe('opacity on colour variables', () => {
  test.each([
    ['bg-brand-500/50', 'background-color:color-mix(in srgb, var(--color-brand-500) 50%, transparent);'],
    ['color-text/[0.3]', 'color:color-mix(in srgb, var(--color-text) 30%, transparent);'],
    ['border-primary/40', 'border-color:color-mix(in srgb, var(--color-primary) 40%, transparent);'],
    ['bg-white/10', 'background-color:color-mix(in srgb, var(--color-white) 10%, transparent);'],
    ['shadow-brand-500/20', '--un-shadow-color:color-mix(in srgb, var(--color-brand-500) 20%, transparent);'],
    ['bg-[var(--color-brand-500)]/50', 'background-color:color-mix(in srgb, var(--color-brand-500) 50%, transparent);'],
  ])('%s', async (className, expected) => {
    expect(await declarations(className, { theme })).toBe(expected)
  })

  test('other colours keep their alpha', async () => {
    expect(await declarations('bg-#ff0000/50')).toBe('background-color:rgb(255 0 0 / 0.5);')
  })

  test('other `/` classes are untouched', async () => {
    expect(await declarations('text-16/24')).toBe('font-size:1rem;line-height:1.5rem;')
  })
})

describe('toColorVariables', () => {
  test('matches the names the preset writes', () => {
    expect(toColorVariables(theme.colors)).toEqual({
      '--color-brand-500': '#4bc485',
      '--color-primary': 'var(--color-brand-500)',
      '--color-primary-text': '#fff',
      '--color-text': '#171717',
      '--color-text-secondary': '#404040',
      '--color-surface-card-bg': '#eee',
    })
  })

  test('skips keywords and self-references', () => {
    expect(toColorVariables({ a: 'transparent', b: 'currentColor', c: 'var(--color-c)', d: '#000' })).toEqual({
      '--color-d': '#000',
    })
  })

  test('colorVariable', () => {
    expect(colorVariable(['text', 'DEFAULT'])).toBe('--color-text')
    expect(colorVariable(['textInCta'])).toBe('--color-text-in-cta')
    expect(colorVariable(['gray', '100'])).toBe('--color-gray-100')
  })
})
