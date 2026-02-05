export default defineEventHandler(async (event) => {
  const db = await useMoviesDb();
  const query = getQuery(event);
  const limit = Number(query.limit) || 20;
  
  // Fetch movies joined with enrichment data
  const movies = await db.all(`
    SELECT m.*, e.thematic_keywords, e.genz_tags, e.vibe_tags, e.genre_blend_score, e.watch_with_who, e.recommendation_chains
    FROM movies m
    LEFT JOIN movie_enrichment e ON m.movieId = e.movieid
    LIMIT ?
  `, [limit]);

  // Parse JSON strings back to arrays/objects
  return movies.map(movie => {
    const genres = movie.genres ? JSON.parse(movie.genres) : [];
    const genreString = Array.isArray(genres) ? genres.map((g: any) => g.name).join(', ') : '';

    return {
      ...movie,
      releaseDate: movie.releaseDate, // Ensure we use the correct DB casing
      genres: genreString,
      thematic_keywords: movie.thematic_keywords ? JSON.parse(movie.thematic_keywords) : [],
      genz_tags: movie.genz_tags ? JSON.parse(movie.genz_tags) : [],
      vibe_tags: movie.vibe_tags ? JSON.parse(movie.vibe_tags) : [],
      watch_with_who: movie.watch_with_who || null,
      recommendation_chains: movie.recommendation_chains ? JSON.parse(movie.recommendation_chains) : []
    };
  });
});
