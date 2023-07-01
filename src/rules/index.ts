import type { Rule } from '@unocss/core'
import { margins, paddings } from './spacing'
import { fontSize, fontWeight, textAligns, textDecorations, textOverflows, textTransforms, verticalAligns } from './typography'
import { heights, maxHeights, maxWidths, minHeights, minWidths, widths } from './size'
import { aspectRatios, displays, isolation, objectFits, overflows, positions, zIndex } from './layout'
import { flex, flexDirections, flexGrows, flexShrinks, flexWraps } from './flex'
import { alignments, justifies, orders, placements } from './position'
import { colors } from './color'
import { misc } from './misc'
import { gaps, gridSystem } from './grid'
import { borderRadiuses } from './border'

export const rules: Rule[] = [
  // misc
  misc,

  // flex
  flex,
  flexDirections,
  flexWraps,
  flexGrows,
  flexShrinks,

  // grid
  gridSystem,
  gaps,

  // layout
  displays,
  aspectRatios,
  isolation,
  objectFits,
  overflows,
  positions,
  zIndex,

  // position,
  justifies,
  orders,
  alignments,
  placements,

  // spacing
  margins,
  paddings,

  // typography
  fontSize,
  fontWeight,
  textAligns,
  verticalAligns,
  textTransforms,
  textDecorations,
  textOverflows,

  // sizes
  widths,
  minWidths,
  maxWidths,
  heights,
  minHeights,
  maxHeights,

  // borders
  borderRadiuses,

  // colors
  colors,
].flat(1)
