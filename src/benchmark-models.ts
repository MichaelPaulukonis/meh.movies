import { getMoviesDb } from './db';
import { getOpenRouterClient } from '../server/utils/llm-provider';
import { MOVIE_ENRICHMENT_PROMPT_TEMPLATE, SCHEMA } from '../server/utils/enrichment-templates';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const client = getOpenRouterClient();
const GOLDEN_IDS = [1672, 1956, 14283, 25530, 38922, 8418, 37534, 15749, 883, 65213];
const MODELS = [
  'anthropic/claude-3-haiku',
  'google/gemini-2.0-flash-lite-001'
];

async function runBenchmark() {
  const db = await getMoviesDb();
  const results: any[] = [];

  console.log(`🚀 Starting benchmark for ${GOLDEN_IDS.length} movies across ${MODELS.length} models...`);

  const movies = await db.all(`SELECT * FROM movies WHERE movieId IN (${GOLDEN_IDS.join(',')})`);

  for (const movie of movies) {
    console.log(`
🎬 [${movie.movieId}] ${movie.title}`);
    const movieResult: any = { movieId: movie.movieId, title: movie.title, models: {} };

    for (const model of MODELS) {
      console.log(`   -> Testing ${model}...`);
      try {
        const prompt = MOVIE_ENRICHMENT_PROMPT_TEMPLATE
          .replace('{{title}}', movie.title)
          .replace('{{overview}}', movie.overview || '')
          .replace('{{genres}}', movie.genres || '')
          .replace('{{releasedate}}', movie.releaseDate || '');

        const start = Date.now();
        const response = await client.chat.completions.create({
          model: model,
          messages: [{ role: "user", content: prompt }],
          tools: [{
            type: "function",
            function: {
              name: "record_movie_enrichment",
              parameters: SCHEMA as any
            }
          }],
          tool_choice: { type: "function", function: { name: "record_movie_enrichment" } }
        });
        const duration = Date.now() - start;

        const toolCall = response.choices[0].message.tool_calls?.[0];
        const parsed = toolCall ? JSON.parse(toolCall.function.arguments) : null;

        movieResult.models[model] = {
          success: !!parsed,
          duration_ms: duration,
          tokens: response.usage,
          data: parsed
        };
        console.log(`      ✅ Success (${duration}ms)`);
      } catch (e: any) {
        console.error(`      ❌ Failed: ${e.message}`);
        movieResult.models[model] = { success: false, error: e.message };
      }
    }
    results.push(movieResult);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `./docs/reference/benchmark-${timestamp}.json`;
  fs.writeFileSync(filename, JSON.stringify(results, null, 2));
  
  console.log(`
✅ Benchmark complete! Results saved to ${filename}`);
}

runBenchmark();
