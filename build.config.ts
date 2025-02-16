import fs from 'node:fs'
import { compile } from 'sass-embedded'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  declaration: true,
  clean: true,
  hooks: {
    'mkdist:done': () => {
      const reset = compile('./src/reset.css', { style: 'compressed' })

      fs.writeFileSync(
        'dist/reset.css',
        reset.css,
      )

      fs.copyFileSync(
        'src/scss/helpers.scss',
        'dist/helpers.scss',
      )
    },
  },
})
