import type { Variant } from '@unocss/core'
import type { OutloudOptions } from '..'
import { variantBreakpoints } from './breakpoints'

export function variants(options: OutloudOptions): Variant[] {
  return [
    variantBreakpoints(options),
  ]
}
