export default defineNuxtConfig({
  extends: ['@outloud/docs'],
  site: {
    name: 'Outloud CSS',
    indexable: false,
  },

  package: {
    path: '../',
  },

  modules: ['@unocss/nuxt'],

  unocss: {
    preflight: false,
  },
})
