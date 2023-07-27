import type { Rule } from '@unocss/core'
import { margin, padding } from './spacing'
import { borderColor, borderRadius, borderWidth } from './border'
import { backgroundColor } from './background'
import { aspectRatio, display, inset, isolation, objectFit, overflow, position, visibility, zIndex } from './layout'
import { flex, flexDirection, flexGrow, flexShrink, flexWrap } from './flex'
import { height, maxHeight, maxWidth, minHeight, minWidth, width } from './size'
import { fontSize, fontStyle, fontWeight, textAlign, textColor, textDecoration, textOverflow, textTransform, verticalAlign, whitespace } from './typography'
import { gap } from './gap'
import { alignContent, alignItems, alignSelf, justifyContent, justifyItems, justifySelf, order, placeContent, placeItems, placeSelf } from './position'
import { grid } from './grid'

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

  // flex
  flex,
  flexDirection,
  flexWrap,
  flexGrow,
  flexShrink,

  // grid
  grid,

  // gap
  gap,

  // position
  justifyContent,
  justifyItems,
  justifySelf,
  order,
  alignContent,
  alignItems,
  alignSelf,
  placeContent,
  placeItems,
  placeSelf,

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
  fontStyle,
  fontWeight,
  textAlign,
  verticalAlign,
  textTransform,
  textDecoration,
  textOverflow,
  textColor,
  whitespace,

  // backgrounds
  backgroundColor,

  // borders
  borderWidth,
  borderRadius,
  borderColor,

].flat(1)
