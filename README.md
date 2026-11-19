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

`presetOutloud()` takes [preset-mini's options](https://unocss.dev/presets/mini#options) (`prefix`, `dark`, `variablePrefix`...) plus `themes`.

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

A value always follows a dash: `w-16`, `mt-8`, `z-10`, `op-50`. preset-mini's forms without one, such as `w16`, `mt8`, `z10` or `op50`, generate nothing, so classes like `h1` stay free for the project's own CSS.

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

## Colours

Every theme colour is a CSS variable, and the utilities use it. The theme in `uno.config.ts` is the one place colours are defined:

```ts
// app/theme.ts
export const theme = {
  colors: {
    brand: { 500: '#4bc485', 900: '#0f271b' },
    primary: { DEFAULT: 'var(--color-brand-500)', text: '#fff' },
    background: '#fff',
    text: { DEFAULT: '#171717', secondary: '#404040' },
  },
} satisfies Theme
```

```css
:root {
  --color-brand-500: #4bc485;
  --color-brand-900: #0f271b;
  --color-primary: var(--color-brand-500);
  --color-primary-text: #fff;
  --color-background: #fff;
  --color-text: #171717;
  --color-text-secondary: #404040;
}

.bg-brand-500 { background-color: var(--color-brand-500); }
.color-text-secondary { color: var(--color-text-secondary); }
.bg-primary\/50 { background-color: color-mix(in srgb, var(--color-primary) 50%, transparent); }
```

- A variable is `--color-` and the theme path in kebab-case, without `DEFAULT`: `text.DEFAULT` is `--color-text`, `surface.cardBg` is `--color-surface-card-bg`. `@outloud/ui` reads these names.
- Opacity works on every theme colour: `bg-primary/50` and `color-text/[0.3]` mix the variable with transparent. The `bg-op-*` and `text-op-*` utilities don't apply to theme colours.
- Keywords (`transparent`, `currentColor`, `inherit`) stay as they are.
- preset-mini's palette (`red-500`, `gray-100`...) isn't included, only `black` and `white`. Define the app's own palette, or spread preset-mini's: `import { colors } from '@unocss/preset-mini'`.
- `theme('colors.brand.500')` in CSS gives `var(--color-brand-500)`. For a literal value, such as the `theme-color` meta tag, import it from the theme file.

### Dark mode and other colour sets

`themes` overrides colours under a selector. A key starting with `@` wraps `:root` in it:

```ts
presetOutloud({
  themes: {
    '.dark': { colors: { background: '#0a0a0a', text: { DEFAULT: '#fafafa' } } },
    '[data-client="acme"]': { colors: { brand: { 500: '#ff3712' } } },
    '@media print': { colors: { background: '#fff' } },
  },
})
```

```css
.dark { --color-background: #0a0a0a; --color-text: #fafafa; }
[data-client="acme"] { --color-brand-500: #ff3712; }
@media print { :root { --color-background: #fff; } }
```

### Runtime theming

To swap colours at runtime, such as an organisation's brand from an API, set the variables. `toColorVariables` gives the names the preset writes:

```ts
import { toColorVariables } from '@outloud/css/helpers'

for (const [name, value] of Object.entries(toColorVariables(organization.colors))) {
  document.documentElement.style.setProperty(name, value)
}
```

## CSS layers

The preset sets no layers itself, and `reset.css` ships unlayered, so the app decides where it goes. To put the reset, UnoCSS's preflights and the utilities into layers, declare the order before anything else and import the reset into its layer:

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
