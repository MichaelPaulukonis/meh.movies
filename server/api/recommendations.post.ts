export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { mood } = body;

  if (!mood) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Mood is required'
    });
  }

  const db = await useMoviesDb();
  
  // Get a sample of enriched movies to match against
  // In a larger app, we'd use vector search or better filtering
  const enrichedMovies = await db.all(`
    SELECT m.movieid, m.title, m.overview, e.thematic_keywords, e.genz_tags, e.vibe_tags
    FROM movies m
    JOIN movie_enrichment e ON m.movieid = e.movieid
    LIMIT 20
  `);

  if (enrichedMovies.length === 0) {
    return {
      recommendations: [],
      message: "No enriched movies found in database yet. Run enrichment scripts first! 💀"
    };
  }

  const recommendations = await getMoodRecommendations(mood, enrichedMovies);

  // Hydrate recommendations with full movie data
  const hydrated = await Promise.all(recommendations.map(async (rec: any) => {
    const movie = await db.get('SELECT * FROM movies WHERE movieid = ?', [rec.movieid]);
    return {
      ...movie,
      reasoning: rec.reasoning
    };
  }));

  return {
    recommendations: hydrated
  };
});
