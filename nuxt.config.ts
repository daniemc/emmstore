const appEnv = process.env.APP_ENV || 'development';
import { configKeys } from './config.js';
export default defineNuxtConfig({
  devtools: { enabled: true },
  target: 'static',
  ssr: false,
  modules: [
    'nuxt-primevue',
    '@nuxtjs/tailwindcss',
    [
      '@pinia/nuxt',
      {
          autoImports: ['defineStore']
      }
    ]
  ],
  imports: {
    dirs: ['stores', 'composables']
  },
  runtimeConfig: {
      public: {
          appEnv: appEnv,
          apiBase: configKeys[appEnv].apiBase
      }
  },
  primevue: {
    unstyled: true,
  }
})
