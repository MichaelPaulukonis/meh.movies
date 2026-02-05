export default defineEventHandler(async (event) => {
  const db = await useMoviesDb();
  const query = getQuery(event);
  const limit = Number(query.limit) || 20;
  
  // Fetch movies joined with enrichment data
  const movies = await db.all(`
    SELECT m.*, e.thematic_keywords, e.genz_tags, e.vibe_tags, e.genre_blend_score, e.watch_with_who, e.recommendation_chain
    FROM movies m
    LEFT JOIN movie_enrichment e ON m.movieid = e.movieid
    LIMIT ?
  `, [limit]);

  // Parse JSON strings back to arrays/objects
  return movies.map(movie => ({
    ...movie,
    thematic_keywords: movie.thematic_keywords ? JSON.parse(movie.thematic_keywords) : [],
    genz_tags: movie.genz_tags ? JSON.parse(movie.genz_tags) : [],
    vibe_tags: movie.vibe_tags ? JSON.parse(movie.vibe_tags) : [],
    watch_with_who: movie.watch_with_who ? JSON.parse(movie.watch_with_who) : null,
    recommendation_chain: movie.recommendation_chain ? JSON.parse(movie.recommendation_chain) : []
  }));
});
