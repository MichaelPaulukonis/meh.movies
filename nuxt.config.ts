// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  ssr: true,
  runtimeConfig: {
    openrouterApiKey: process.env.OPENROUTER_API_KEY,
    llmModelEnrichment: process.env.LLM_MODEL_ENRICHMENT || 'anthropic/claude-3-haiku',
    llmModelRecommendation: process.env.LLM_MODEL_RECOMMENDATION || 'anthropic/claude-3.5-sonnet',
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    anthropicModel: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20240620',
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
