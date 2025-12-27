import {
  type Theme as MiniTheme,
  theme as miniTheme,
} from '@unocss/preset-mini'

export const theme: Theme = {
  ...miniTheme,

  grid: {
    columns: 12,
    gap: 16,
  },

  flow: {
    maxWidth: 900,
    breakoutMaxWidth: 1200,
    padding: 16,
  },

  container: {
    center: true,
    padding: 16,
    maxWidth: 900,
  },
}

export interface Theme extends Omit<MiniTheme, 'container'> {
  grid?: {
    columns?: number
    gap?: number
  }

  flow?: {
    maxWidth?: number
    breakoutMaxWidth?: number
    padding?: number
  }

  container?: {
    center?: boolean
    padding?: number | string
    maxWidth?: number | string | Record<string, string | number>
  }
}
