import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { type UserConfig, defineConfig } from 'tsdown'

const config: UserConfig = defineConfig({
  entry: ['src/index.ts', 'src/helpers.ts'],
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
      await fs.promises.copyFile(fileURLToPath(import.meta.resolve('@unocss/reset/tailwind.css')), 'dist/reset.css')
      await fs.promises.copyFile('src/scss/helpers.scss', 'dist/helpers.scss')
    },
  },
})

export default config
