/**
 * Prompt Templates for Offline Enrichment
 * These templates are used by background scripts to pre-process movie data.
 */

export const MOVIE_ENRICHMENT_PROMPT_TEMPLATE = `
Analyze the following movie and provide a specialized "Gen-Z" enrichment dataset.
This data will be used to power a discovery engine that matches users' vibes and moods.

MOVIE DATA:
Title: {{title}}
Overview: {{overview}}
Genres: {{genres}}
Release Date: {{releasedate}}

REQUIRED ATTRIBUTES (Return as JSON):

1. thematic_keywords: List 5-8 core thematic keywords that capture the essence of the film (not just plot points).
2. genz_tags: 3-5 Gen-Z flavored tags or slang that describes the film's vibe (e.g., "slay", "lowkey unhinged", "rent free", "healing", "no thoughts head empty").
3. vibe_tags: 3-5 emotional or atmospheric vibe tags (e.g., "melancholy", "chaotic", "cozy", "neon-noir", "liminal").
4. genre_blend_score: A single integer (0-100) representing how much of a hybrid "genre-bender" this movie is (0 = pure genre, 100 = impossible to categorize).
5. watch_with_who: A short, punchy suggestion of who to watch this with (e.g., "watch with your situationship", "watch with the besties while high on life", "watch alone in the dark").
6. recommendation_chain: A list of 3 other well-known movie titles that form a natural progression (If you like X, you might like Y).

SAFETY & CONSTRAINTS:
- Use clear, safe language.
- Ensure the Gen-Z tags are playful but recognizable.
- Return ONLY valid JSON.
`;

/**
 * Example of how to safely construct the prompt to prevent injection
 * if metadata (like titles) were to ever contain malicious sequences.
 */
export function constructEnrichmentPrompt(movie: { title: string, overview: string, genres: string, releasedate: string }) {
  // Defensive framing: We inject the data into a fixed template
  // and sanitize any potential escaping sequences.
  const sanitize = (str: string) => str.replace(/{{|}}/g, '').trim();

  return MOVIE_ENRICHMENT_PROMPT_TEMPLATE
    .replace('{{title}}', sanitize(movie.title))
    .replace('{{overview}}', sanitize(movie.overview))
    .replace('{{genres}}', sanitize(movie.genres))
    .replace('{{releasedate}}', sanitize(movie.releasedate));
}
