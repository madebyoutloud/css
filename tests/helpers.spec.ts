import { fileURLToPath } from 'node:url'
import { compileString } from 'sass-embedded'
import { describe, expect, test } from 'vitest'
import { toRem, toSize } from '../src/helpers.js'

describe('toRem', () => {
  test('px to rem', () => {
    expect(toRem(16)).toBe('1rem')
    expect(toRem(24)).toBe('1.5rem')
    expect(toRem(20, 10)).toBe('2rem')
  })
})

describe('toSize', () => {
  test('numbers are px', () => {
    expect(toSize(32)).toBe('2rem')
    expect(toSize('8')).toBe('0.5rem')
  })

  test('other values pass through', () => {
    expect(toSize('50%')).toBe('50%')
    expect(toSize('2rem')).toBe('2rem')
  })
})

describe('helpers.scss', () => {
  test('rem() uses a 16px base', () => {
    const { css } = compileString('@use "helpers"; a { width: helpers.rem(24); }', {
      loadPaths: [fileURLToPath(new URL('../src/scss', import.meta.url))],
    })

    expect(css).toContain('width: 1.5rem;')
  })
})
