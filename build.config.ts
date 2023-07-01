import fs from 'node:fs'
import sass from 'sass'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  hooks: {
    'mkdist:done': () => {
      const reset = sass.compile('./src/reset.css', { style: 'compressed' })

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
