export const directionMap: Record<string, string[]> = {
  'l': ['-left'],
  'r': ['-right'],
  't': ['-top'],
  'b': ['-bottom'],
  's': ['-inline-start'],
  'e': ['-inline-end'],
  'x': ['-left', '-right'],
  'y': ['-top', '-bottom'],
  '': [''],
}

export const gapMap: Record<string, string[]> = {
  'x': ['column-'],
  'y': ['row-'],
  'col': ['--'],
  '': [''],
}

export const globalKeywords = [
  'inherit',
  'initial',
  'revert',
  'revert-layer',
  'unset',
]
