import { getMoviesDb } from './db';
import { getOpenRouterClient, getModelId } from '../server/utils/llm-provider';
import { MOVIE_ENRICHMENT_PROMPT_TEMPLATE, SCHEMA, type MovieEnrichment } from '../server/utils/enrichment-templates';
import dotenv from 'dotenv';

dotenv.config();

const client = getOpenRouterClient();
const model = getModelId('enrichment');

async function enrichAllMovies() {
  const db = await getMoviesDb();

  // Find 100 random movies that don't have enrichment yet
  const movies = await db.all(`
    SELECT m.* FROM movies m
    LEFT JOIN movie_enrichment e ON m.movieId = e.movieid
    WHERE e.movieid IS NULL
    ORDER BY RANDOM()
    LIMIT 100
  `);

  console.log(`Found ${movies.length} random unenriched movies. Let's goooo. 🚀`);
  console.log(`Using model: ${model}`);

  let totalInputTokens = 0;
  let totalOutputTokens = 0;

  for (const movie of movies) {
    console.log(`\nEnriching [${movie.movieId}]: ${movie.title}...`);

    try {
      const prompt = MOVIE_ENRICHMENT_PROMPT_TEMPLATE
        .replace('{{title}}', movie.title)
        .replace('{{overview}}', movie.overview || '')
        .replace('{{genres}}', movie.genres || '')
        .replace('{{releasedate}}', movie.releaseDate || '');

      const response = await client.chat.completions.create({
        model: model,
        max_tokens: 1024,
        messages: [{
          role: "user",
          content: prompt
        }],
        tools: [
          {
            type: "function",
            function: {
              name: "record_movie_enrichment",
              description: "Save the enriched movie metadata into the database.",
              parameters: SCHEMA as any
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "record_movie_enrichment" } }
      });

      // Track tokens
      totalInputTokens += response.usage?.prompt_tokens || 0;
      totalOutputTokens += response.usage?.completion_tokens || 0;

      const toolCall = response.choices[0].message.tool_calls?.[0];
      if (!toolCall) {
        throw new Error('Model failed to use the enrichment tool. Major L.');
      }

      const result = JSON.parse(toolCall.function.arguments);

      if (result) {
        const enriched = result as MovieEnrichment;

        await db.run(`
          INSERT INTO movie_enrichment (
            movieid, thematic_keywords, genz_tags, vibe_tags, 
            genre_blend_score, watch_with_who, recommendation_chains
          ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
          movie.movieId,
          JSON.stringify(enriched.thematic_keywords),
          JSON.stringify(enriched.genz_tags),
          JSON.stringify(enriched.vibe_tags),
          enriched.genre_blend_score,
          enriched.watch_with_who,
          JSON.stringify(enriched.recommendation_chains)
        ]);

        console.log(`✅ Success. Call tokens: In: ${response.usage?.prompt_tokens} | Out: ${response.usage?.completion_tokens}`);
      }
    } catch (e) {
      console.error(`❌ Failed to enrich ${movie.title}:`, e);
    }
  }

  // Final Summary
  console.log('\n--- ENRICHMENT SUMMARY ---');
  console.log(`Movies Processed: ${movies.length}`);
  console.log(`Total Input Tokens: ${totalInputTokens}`);
  console.log(`Total Output Tokens: ${totalOutputTokens}`);
  
  // Cost estimate for Haiku via OpenRouter (~$0.25/$1.25 per 1M)
  const estimatedCost = ((totalInputTokens / 1000000) * 0.25) + ((totalOutputTokens / 1000000) * 1.25);
  console.log(`Estimated Cost: ~$${estimatedCost.toFixed(4)}`);
  console.log('--------------------------\n');
}

enrichAllMovies();
