import type { Rule } from '@unocss/core'
import { backgroundColor } from './background'
import { borderColor, borderRadius, borderWidth } from './border'
import { flex, flexDirection, flexGrow, flexShrink, flexWrap } from './flex'
import { gap } from './gap'
import { grid } from './grid'
import { cursor, userSelect } from './interactivity'
import { aspectRatio, display, inset, isolation, objectFit, overflow, position, visibility, zIndex } from './layout'
import { opacity } from './other'
import { alignContent, alignItems, alignSelf, justifyContent, justifyItems, justifySelf, order, placeContent, placeItems, placeSelf } from './position'
import { height, maxHeight, maxWidth, minHeight, minWidth, width } from './size'
import { margin, padding } from './spacing'
import { pointerEvents } from './static'
import { fontSize, fontStyle, fontWeight, textAlign, textColor, textDecoration, textOverflow, textTransform, verticalAlign, whitespace } from './typography'

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

  // other
  opacity,
  pointerEvents,

  // interactivity
  cursor,
  userSelect,

].flat(1)
