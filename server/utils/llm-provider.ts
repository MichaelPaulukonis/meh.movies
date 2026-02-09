import { OpenAI } from 'openai';

/**
 * Shared LLM Provider for OpenRouter.
 * Handles both Nuxt runtime config and standalone Node environment variables.
 */
export function getOpenRouterClient() {
  let apiKey = '';
  
  // Try Nuxt runtime config first (if in Nuxt environment)
  try {
    // @ts-ignore - useRuntimeConfig is a Nuxt auto-import
    const config = useRuntimeConfig();
    apiKey = config.openrouterApiKey;
  } catch (e) {
    // Fallback to process.env for standalone scripts
    apiKey = process.env.OPENROUTER_API_KEY || '';
  }

  if (!apiKey) {
    console.warn('OPENROUTER_API_KEY is missing. LLM calls will fail.');
  }

  return new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: apiKey,
    defaultHeaders: {
      'HTTP-Referer': 'https://github.com/meh-movies', // Optional, for OpenRouter rankings
      'X-Title': 'meh.movies',
    }
  });
}

/**
 * Gets the model ID for a specific task.
 */
export function getModelId(task: 'enrichment' | 'recommendation') {
  try {
    // @ts-ignore
    const config = useRuntimeConfig();
    return task === 'enrichment' 
      ? config.llmModelEnrichment 
      : config.llmModelRecommendation;
  } catch (e) {
    return task === 'enrichment'
      ? process.env.LLM_MODEL_ENRICHMENT || 'anthropic/claude-3-haiku'
      : process.env.LLM_MODEL_RECOMMENDATION || 'anthropic/claude-3.5-sonnet';
  }
}
