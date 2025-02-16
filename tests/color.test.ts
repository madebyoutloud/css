import type { RuleContext } from '@unocss/core'
import { createGenerator, symbols } from '@unocss/core'

import { describe, expect, it } from 'vitest'
import { colorResolver } from '../src/utils/color'

describe('color utils', () => {
  it('parses color token', async () => {
    const context: RuleContext = {
      theme: {
        colors: {
          black: '#000000',
          info: 'hsl(200.1,100%,54.3%)',
          warning: 'hsl(42.4 100% 50%)',
          danger: 'hsl(var(--danger))',
        },
      },
      symbols,
      rawSelector: '',
      currentSelector: '',
      generator: await createGenerator(),
      variantHandlers: [],
      variantMatch: ['', '', [], new Set()],
      constructCSS: () => '',
    }

    const fn = (body: string) => colorResolver('prop')(['', body], context)

    expect(fn('info')).eql({
      prop: 'hsl(200.1,100%,54.3%)',
    })

    expect(fn('info/10')).eql({
      prop: 'hsl(200.1 100% 54.3% / 0.1)',
    })

    expect(fn('black/10')).eql({
      prop: 'rgb(0 0 0 / 0.1)',
    })
  })
})
