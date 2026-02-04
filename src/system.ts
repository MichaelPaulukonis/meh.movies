import OpenAI from 'openai';
import { Database } from 'sqlite';
import { getMoviesDb, getRatingsDb } from './db.js';

export class MovieSystem {
    private openai: OpenAI;
    private moviesDb?: Database;
    private ratingsDb?: Database;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async init() {
        this.moviesDb = await getMoviesDb();
        this.ratingsDb = await getRatingsDb();
    }

    async getRecommendations(query: string) {
        // First, get some context from the DB
        const movies = await this.moviesDb?.all('SELECT title, overview, genres FROM movies LIMIT 20');
        
        const prompt = `
        Based on the user query: "${query}"
        And the following available movies:
        ${JSON.stringify(movies)}

        Provide 3 movie recommendations. For each, include:
        - title
        - reason (why it matches the query)
        - predicted_rating (out of 5)

        Return the response as a JSON array of objects.
        `;

        const response = await this.openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });

        return JSON.parse(response.choices[0].message.content || '{"recommendations": []}');
    }

    async getUserPreferenceSummary(userId: number) {
        const ratings = await this.ratingsDb?.all(
            `SELECT r.rating, m.title, m.genres, m.overview 
             FROM ratings r 
             JOIN movies m ON r.movieId = m.movieId 
             WHERE r.userId = ?`, 
            [userId]
        );

        if (!ratings || ratings.length === 0) return "No ratings found for this user.";

        const prompt = `
        Analyze the following movie ratings for user ${userId}:
        ${JSON.stringify(ratings)}

        Provide a summary of the user's movie preferences, including:
        - Favorite genres
        - What they value in a movie (e.g., plot complexity, tone)
        - A general personality profile of their movie taste.

        Return as a structured JSON object.
        `;

        const response = await this.openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });

        return JSON.parse(response.choices[0].message.content || '{}');
    }

    async close() {
        await this.moviesDb?.close();
        await this.ratingsDb?.close();
    }
}
