import type { Rule } from '@unocss/core'
import { margin, padding } from './spacing'
import { borderColor, borderRadius, borderWidth } from './border'
import { backgroundColor } from './background'
import { aspectRatio, display, inset, isolation, objectFit, overflow, position, visibility, zIndex } from './layout'
import { alignment, flex, flexDirection, flexGrow, flexShrink, flexWrap, gap, justify, order, placement } from './flex-grid'
import { gridSystem } from './grid-system'
import { height, maxHeight, maxWidth, minHeight, minWidth, width } from './size'
import { fontSize, fontWeight, textAlign, textColor, textDecoration, textOverflow, textTransform, verticalAlign } from './typography'

export const rules: Rule[] = [
  // layout
  aspectRatio,
  display,
  isolation,
  objectFit,
  overflow,
  position,
  inset,
  visibility,
  zIndex,

  // flex / grid
  flex,
  flexDirection,
  flexWrap,
  flexGrow,
  flexShrink,

  gap,

  justify,
  order,
  alignment,
  placement,

  // grid system
  gridSystem,

  // spacing
  margin,
  padding,

  // sizes
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,

  // typography
  fontSize,
  fontWeight,
  textAlign,
  verticalAlign,
  textTransform,
  textDecoration,
  textOverflow,
  textColor,

  // backgrounds
  backgroundColor,

  // borders
  borderWidth,
  borderRadius,
  borderColor,

].flat(1)
