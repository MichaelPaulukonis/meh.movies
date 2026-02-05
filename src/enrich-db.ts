import { getMoviesDb } from './db';
import Anthropic from '@anthropic-ai/sdk';
import { MOVIE_ENRICHMENT_PROMPT_TEMPLATE } from '../server/utils/enrichment-templates';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

async function enrichAllMovies() {
  const db = await getMoviesDb();
  
  // Find movies that don't have enrichment yet
  const movies = await db.all(`
    SELECT m.* FROM movies m
    LEFT JOIN movie_enrichment e ON m.movieid = e.movieid
    WHERE e.movieid IS NULL
    LIMIT 5
  `);

  console.log(`Found \${movies.length} movies to enrich...`);

  for (const movie of movies) {
    console.log(`Enriching: \${movie.title}...`);
    
    try {
      const prompt = MOVIE_ENRICHMENT_PROMPT_TEMPLATE
        .replace('{{title}}', movie.title)
        .replace('{{overview}}', movie.overview || '')
        .replace('{{genres}}', movie.genres || '')
        .replace('{{releasedate}}', movie.releasedate || '');

      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307', // Using haiku for batch enrichment to save costs
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });

      const content = response.content[0].type === 'text' ? response.content[0].text : '';
      const jsonMatch = content.match(/{[\s\S]*}/);
      
      if (jsonMatch) {
        const enriched = JSON.parse(jsonMatch[0]);
        
        await db.run(`
          INSERT INTO movie_enrichment (
            movieid, thematic_keywords, genz_tags, vibe_tags, 
            genre_blend_score, watch_with_who, recommendation_chain
          ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
          movie.movieid,
          JSON.stringify(enriched.thematic_keywords),
          JSON.stringify(enriched.genz_tags),
          JSON.stringify(enriched.vibe_tags),
          enriched.genre_blend_score,
          enriched.watch_with_who,
          JSON.stringify(enriched.recommendation_chain)
        ]);
        
        console.log(`✅ Successfully enriched \${movie.title}`);
      }
    } catch (e) {
      console.error(`❌ Failed to enrich \${movie.title}:`, e);
    }
  }
}

enrichAllMovies();
