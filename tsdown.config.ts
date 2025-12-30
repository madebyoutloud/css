import fs from 'node:fs'
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/helpers.ts',
  ],
  clean: true,
  dts: true,
  treeshake: true,
  minify: true,
  outDir: './dist',
  format: ['esm'],
  platform: 'node',
  target: 'es2022',
  attw: {
    profile: 'esm-only',
  },
  hooks: {
    'build:done': async () => {
      const resetPath = import.meta.resolve('@unocss/reset/tailwind.css')

      await fs.promises.copyFile(
        resetPath.replace('file://', ''),
        'dist/reset.css',
      )

      await fs.promises.copyFile(
        'src/scss/helpers.scss',
        'dist/helpers.scss',
      )
    },
  },
})
