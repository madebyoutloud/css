import { createConfig } from '@outloud/oxlint-config'
import type { OxlintConfig } from 'oxlint'

const config: OxlintConfig = createConfig({
  root: import.meta.dirname,
  // the docs site is a Nuxt app with its own dependencies
  features: { vue: false, nuxt: false },
  ignorePatterns: ['docs/**'],
})

export default config
