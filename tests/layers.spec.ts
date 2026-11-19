import { readFile } from 'node:fs/promises'
import { createGenerator } from '@unocss/core'
import { describe, expect, test } from 'vitest'
import { presetOutloud } from '../src/index.js'

describe('css layers', () => {
  test('the documented setup puts preflights in reset and utilities in uno', async () => {
    const generator = await createGenerator({
      presets: [presetOutloud({ generateColorVariables: true })],
      theme: { colors: { primary: '#ff3712' } },
      outputToCssLayers: {
        cssLayerName: (layer) => (layer === 'preflights' ? 'reset' : 'uno'),
      },
    })
    const { css } = await generator.generate('p-16')

    expect(css).toMatch(/@layer reset\{\n\*,::before,::after\{--un-rotate:0;/)
    expect(css).toMatch(/@layer uno\{\n\.p-16\{padding:1rem;\}/)
    expect(css).toMatch(/@layer uno\{\n:root\{[^}]*--color-primary: #ff3712;/)
  })

  test('no layers unless the app asks for them', async () => {
    const generator = await createGenerator({ presets: [presetOutloud()] })
    const { css } = await generator.generate('p-16')

    expect(css).not.toContain('@layer')
  })

  test('the shipped reset sets no layer, so an import can choose one', async () => {
    const reset = await readFile(new URL(import.meta.resolve('@unocss/reset/tailwind.css')), 'utf8')

    expect(reset).not.toContain('@layer')
  })
})
