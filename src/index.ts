import { getMoviesDb, getRatingsDb } from './db.js';
import { enrichMovie } from './enrichment.js';
import fs from 'fs';

async function main() {
    const moviesDb = await getMoviesDb();
    const ratingsDb = await getRatingsDb();
    
    // Select 50 movies with overview
    const movies = await moviesDb.all('SELECT * FROM movies WHERE overview IS NOT NULL AND overview != "" LIMIT 50');
    
    console.log(`Enriching ${movies.length} movies...`);
    
    const enrichedData = [];
    for (const movie of movies) {
        try {
            console.log(`Processing: ${movie.title} (ID: ${movie.movieId})`);
            
            // Get average rating for this movie
            const ratingData = await ratingsDb.get('SELECT AVG(rating) as avgRating FROM ratings WHERE movieId = ?', [movie.movieId]);
            const avgRating = ratingData?.avgRating || 0;

            const enrichment = await enrichMovie({ ...movie, avgRating });
            enrichedData.push({
                movieId: movie.movieId,
                title: movie.title,
                avgRating,
                ...enrichment
            });
        } catch (error) {
            console.error(`Error enriching ${movie.title}:`, error);
        }
    }
    
    fs.writeFileSync('enriched_movies.json', JSON.stringify(enrichedData, null, 2));
    console.log('Enrichment complete. Results saved to enriched_movies.json');
    
    await moviesDb.close();
    await ratingsDb.close();
}

main().catch(console.error);
