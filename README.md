<p align="center">
  <a href="https://css.byoutloud.com" target="_blank" rel="noopener noreferrer">
    <img src="https://css.byoutloud.com/images/social.png" alt="Outloud CSS">
  </a>
</p>

# Outloud CSS

UnoCSS preset by Outloud. It builds on [`@unocss/preset-mini`](https://unocss.dev/presets/mini), which covers most of Tailwind's utilities, and adds a few layout rules.

<p>
  <a href="https://www.npmjs.com/package/@outloud/css"><img src="https://badgen.net/npm/v/@outloud/css/latest" alt="Version"></a>
  <a href="https://npmcharts.com/compare/@outloud/css?minimal=true"><img src="https://badgen.net/npm/dm/@outloud/css" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/@outloud/css"><img src="https://img.shields.io/npm/l/@outloud/css.svg?sanitize=true" alt="License"></a>
</p>

Full documentation: [css.byoutloud.com](https://css.byoutloud.com).

## Install

```bash
pnpm add -D unocss @outloud/css
```

```ts
// uno.config.ts
import { defineConfig, transformerDirectives } from 'unocss'
import { presetOutloud, type Theme } from '@outloud/css'

export default defineConfig<Theme>({
  presets: [presetOutloud()],
  transformers: [transformerDirectives()],
})
```

Import the reset once, before your own styles:

```css
@import '@outloud/css/reset.css';
```

`presetOutloud()` takes [preset-mini's options](https://unocss.dev/presets/mini#options) (`prefix`, `dark`, `variablePrefix`...) plus `generateColorVariables`.

## Numbers are px

A bare number in a class is px, written in rem with a 16px base, so classes match how designs are measured:

| Class | CSS |
| --- | --- |
| `p-16` | `padding: 1rem` |
| `gap-24` | `gap: 1.5rem` |
| `w-320` | `width: 20rem` |
| `fs-14` | `font-size: 0.875rem` |
| `leading-20` | `line-height: 1.25rem` |
| `rounded-8` | `border-radius: 0.5rem` |
| `text-16/24` | `font-size: 1rem; line-height: 1.5rem` |

This applies to every rule that would otherwise give a rem value: margins, paddings, gaps, insets, sizes, font size, line height, letter spacing, border radius, translate, flex basis and text indent. Numbers that aren't lengths stay as they are: `z-10`, `opacity-50`, `font-700`, `flex-1`, `col-6`. Borders, outlines and rings are already px in preset-mini: `border-2` is `2px`.

Theme keys keep preset-mini's values: `text-base` is 16px / 24px, `rounded-lg` 8px, `max-w-md` 448px. Don't use numbers as theme keys, since a number always means px.

## Custom rules

| Class | What it does |
| --- | --- |
| `flow` | Grid with a centred content column, a wider `breakout` column and `full-width`. Children sit in the content column; `data-flow="breakout"` or `data-flow="full-width"` moves one out. Sizes come from `theme.flow`. |
| `container` | Centred, padded box with a max width, and a container query parent (`container-type: inline-size`). Sizes come from `theme.container`; an object `maxWidth` adds `data-size` variants. |
| `columns` | 12-column grid (`theme.grid.columns`) with `theme.grid.gap`. Children span all columns by default. |
| `col-{n}` | Spans `n` columns. preset-mini's `col-*` and `row-*` are `grid-col-*` and `grid-row-*` here. |
| `offset-{n}` | Starts at column `n`. |
| `pile` | Stacks all children in one grid cell, centred. |
| `prose` | `1em` of space between direct children. |
| `stack` | `flex` column. |
| `flex-center` | `flex`, centred on both axes. |
| `flex-content` / `flex-fill` | `flex: 0 0 auto` / `flex: 1 0 auto`. |
| `fs-{size}` | Font size only, from `theme.fontSize` or px. |

Their theme, with the defaults in px:

```ts
export default defineConfig<Theme>({
  theme: {
    grid: { columns: 12, gap: 16 },
    flow: { maxWidth: 900, breakoutMaxWidth: 1200, padding: 16 },
    // an object adds sizes: <div class="container" data-size="sm">
    container: { center: true, padding: 16, maxWidth: 900 },
  },
})
```

## Colour variables

`presetOutloud({ generateColorVariables: true })` writes every theme colour as a variable on `:root`, such as `--color-primary` or `--color-gray-100`.

## CSS layers

The preset sets no layers itself. To put the reset, UnoCSS's preflights and the utilities into layers, declare the order before anything else and import the reset into its layer:

```css
/* layers.css, loaded first */
@layer reset, vendor, app, uno;

@import '@outloud/css/reset.css' layer(reset);
@import 'some-library/style.css' layer(vendor);
```

Then let UnoCSS put its preflights into `reset` and the utilities into `uno`, with [`outputToCssLayers`](https://unocss.dev/config/layers#output-to-css-layers):

```ts
// uno.config.ts
export default defineConfig<Theme>({
  presets: [presetOutloud()],
  outputToCssLayers: {
    cssLayerName: (layer) => (layer === 'preflights' ? 'reset' : 'uno'),
  },
})
```

Write the app's own styles in `@layer app`, or leave them unlayered to win over everything.

## Helpers

```ts
import { toRem, toSize } from '@outloud/css/helpers'

toRem(24) // '1.5rem'
toSize(24) // '1.5rem'
toSize('50%') // '50%'
```

```scss
@use '@outloud/css/helpers.scss' as *;

.card {
  padding: rem(24); // 1.5rem
}
```

## Upgrading

See [migrations](./migrations) for upgrade guides.
