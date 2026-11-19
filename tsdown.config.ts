import { fileURLToPath } from 'node:url'
import { defineConfig, type UserConfig } from 'tsdown'

const config: UserConfig = defineConfig({
  entry: ['src/index.ts', 'src/helpers.ts'],
  clean: true,
  treeshake: true,
  fixedExtension: false,
  outDir: './dist',
  copy: [
    { from: fileURLToPath(import.meta.resolve('@unocss/reset/tailwind.css')), rename: 'reset.css' },
    'src/scss/helpers.scss',
  ],
  format: ['esm'],
  dts: true,
  platform: 'node',
  target: 'es2022',
  attw: {
    profile: 'esm-only',
  },
})

export default config
