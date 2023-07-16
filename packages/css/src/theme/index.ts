export const baseSize = {
  'xs': '20rem',
  'sm': '24rem',
  'md': '28rem',
  'lg': '32rem',
  'xl': '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem',
  '7xl': '80rem',
  'prose': '65ch',
}

// keep in ASC order: container.ts and breakpoints.ts need that order
export const breakpoints = {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
} satisfies Theme['breakpoints']

export const verticalBreakpoints = { ...breakpoints } satisfies Theme['breakpoints']

const spacing = [0, 1, 2, 4, 8, 12, 16, 20, 24, 32, 48, 64, 96]
const zIndex = [0, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500]

const colors = {
  white: '#ffffff',
  black: '#000000',
}

export const containers = Object.fromEntries(Object.entries(baseSize).map(([k, v]) => [k, `(min-width: ${v})`])) satisfies Theme['containers']

export const theme: Theme = {
  baseFontSize: 16,
  unit: 'rem',

  spacing,

  colors,

  zIndex,

  grid: {
    columns: 12,
    gap: 16,
  },

  // container: {
  //   center: true,
  //   padding: 32,
  // },

  breakpoints,
  verticalBreakpoints,

  containers,
}

export interface Theme {
  /**
   * @default rem
   */
  unit?: 'rem' | 'em' | 'px' | null
  /**
   * 1rem = n px
   * @default 16
   */
  baseFontSize?: number
  spacing?: number[]

  zIndex?: number[]

  colors?: Record<string, string>

  grid?: {
    columns?: number
    gap?: number
  }

  // container?: {
  //   padding?: number | Record<string, number>
  //   center?: boolean
  //   maxWidth?: Record<string, number>
  // }

  breakpoints?: Record<string, string>
  verticalBreakpoints?: Record<string, string>

  containers?: Record<string, string>

}
