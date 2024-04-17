const appEnv = process.env.APP_ENV || 'development';
import { configKeys } from './config.js';
export default defineNuxtConfig({
  devtools: { enabled: true },
  target: 'static',
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss',
    [
      '@pinia/nuxt',
      {
          autoImports: ['defineStore']
      }
    ]
  ],
  css: [
    'boxicons/css/boxicons.min.css', 
    'assets/css/custom.css'
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
})
