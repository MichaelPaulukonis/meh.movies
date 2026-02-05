import { getMoviesDb } from './db';
import Anthropic from '@anthropic-ai/sdk';
import { MOVIE_ENRICHMENT_PROMPT_TEMPLATE, SCHEMA, type MovieEnrichment } from '../server/utils/enrichment-templates';
import dotenv from 'dotenv';

dotenv.config();

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

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

      const response = await client.messages.create({
        model: process.env.ANTHROPIC_ENRICHMENT_MODEL || 'claude-3-haiku-20240307',
        max_tokens: 1024,
        messages: [{
          role: "user",
          content: prompt
        }],
        tools: [
          {
            name: "record_movie_enrichment",
            description: "Save the enriched movie metadata into the database.",
            input_schema: SCHEMA
          }
        ],
        tool_choice: { type: "tool", name: "record_movie_enrichment" }
      });

      // Track tokens
      totalInputTokens += response.usage.input_tokens;
      totalOutputTokens += response.usage.output_tokens;

      const toolUseBlock = response.content.find(block => block.type === 'tool_use');
      if (!toolUseBlock || toolUseBlock.type !== 'tool_use') {
        throw new Error('Claude failed to use the enrichment tool. Major L.');
      }

      const result = toolUseBlock.input;

      if (result) {
        const enriched = result as unknown as MovieEnrichment;

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

        console.log(`✅ Success. Call tokens: In: ${response.usage.input_tokens} | Out: ${response.usage.output_tokens}`);
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
  
  // Quick cost estimate for Haiku ($0.25/$1.25 per 1M)
  const estimatedCost = ((totalInputTokens / 1000000) * 0.25) + ((totalOutputTokens / 1000000) * 1.25);
  console.log(`Estimated Cost (Haiku): ~$${estimatedCost.toFixed(4)}`);
  console.log('--------------------------\n');
}

enrichAllMovies();
