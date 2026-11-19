export default defineNuxtConfig({
  extends: ['@outloud/docs'],
  site: {
    name: 'Outloud CSS',
  },

  package: {
    path: '../',
  },

  modules: ['@unocss/nuxt'],

  unocss: {
    preflight: false,
  },

  mcp: {
    enabled: false,
  },

  nitro: {
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
})
