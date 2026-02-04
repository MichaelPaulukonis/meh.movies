import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function enrichMovie(movie: any) {
    const prompt = `
    Analyze the following movie data and provide 5 additional attributes in JSON format:
    Title: ${movie.title}
    Overview: ${movie.overview}
    Budget: ${movie.budget}
    Revenue: ${movie.revenue}
    Genres: ${movie.genres}
    Average Rating: ${movie.avgRating}

    Required attributes:
    1. sentiment: Sentiment analysis of the overview (positive, negative, or neutral).
    2. budget_tier: Categorize budget into tiers (low, medium, high) based on typical movie budgets.
    3. revenue_tier: Categorize revenue into tiers (low, medium, high) based on typical box office performance.
    4. production_effectiveness: A score from 1-10 reflecting how well the movie performed relative to its budget and revenue, considering its average rating of ${movie.avgRating}.
    5. target_audience: A brief description of the likely target demographic.

    Return only the JSON object.
    `;

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    return content ? JSON.parse(content) : {};
}
