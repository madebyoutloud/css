import { createGenerator, type UserConfig } from '@unocss/core'
import { presetOutloud } from '../src/index.js'
import type { Theme } from '../src/theme.js'
import type { PresetOutloudOptions } from '../src/types.js'

interface Options extends PresetOutloudOptions {
  theme?: Theme
  preflights?: boolean
}

// generated CSS without layer comments, one rule per line
export async function generate(classes: string | string[], options: Options = {}): Promise<string> {
  const { theme, preflights = false, ...presetOptions } = options
  const config: UserConfig<Theme> = { presets: [presetOutloud(presetOptions)], theme }
  const generator = await createGenerator<Theme>(config)
  const { css } = await generator.generate(new Set([classes].flat()), { preflights })

  return css
    .split('\n')
    .filter((line) => !line.startsWith('/*'))
    .join('\n')
}

// the declarations of a single class, such as `padding:1rem;`
export async function declarations(className: string, options?: Options): Promise<string> {
  const css = await generate(className, options)

  return css.match(/\{(.*)\}/s)?.[1]?.trim() ?? ''
}
