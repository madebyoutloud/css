import path from 'node:path'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',

  experimental: {
    inlineSSRStyles: false,
  },

  vite: {
    plugins: [
      svgLoader({
        svgo: false,
      }),
    ],
  },

  css: ['@outloud/css/reset.css', '~/styles/app.scss'],

  modules: [
    '@unocss/nuxt',
  ],

  alias: {
    '@outloud/css/src': path.resolve(__dirname, '../packages/css/src'),
  },

  unocss: {
    autoImport: true,
    preflight: false,
  },
})
