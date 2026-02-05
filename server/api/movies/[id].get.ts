export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const db = await useMoviesDb();
  
  const movie = await db.get(`
    SELECT m.*, e.thematic_keywords, e.genz_tags, e.vibe_tags, e.genre_blend_score, e.watch_with_who, e.recommendation_chains
    FROM movies m
    LEFT JOIN movie_enrichment e ON m.movieId = e.movieid
    WHERE m.movieId = ?
  `, [id]);

  if (!movie) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Movie not found'
    });
  }

  // Parse JSON fields
  return {
    ...movie,
    thematic_keywords: movie.thematic_keywords ? JSON.parse(movie.thematic_keywords) : [],
    genz_tags: movie.genz_tags ? JSON.parse(movie.genz_tags) : [],
    vibe_tags: movie.vibe_tags ? JSON.parse(movie.vibe_tags) : [],
    watch_with_who: movie.watch_with_who || null,
    recommendation_chains: movie.recommendation_chains ? JSON.parse(movie.recommendation_chains) : []
  };
});
