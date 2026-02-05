// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  ssr: true,
  runtimeConfig: {
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    public: {
      // Public variables if any
    }
  },
  nitro: {
    // Ensure SQLite database is treated as an external dependency
    externals: {
      external: ['sqlite3']
    }
  }
})
