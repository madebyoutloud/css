import { createConfig } from '@outloud/oxfmt-config'
import type { OxfmtConfig } from 'oxfmt'

const config: OxfmtConfig = createConfig({}, { ignorePatterns: ['docs/**'] })

export default config
