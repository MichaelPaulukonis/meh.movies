import type Anthropic from '@anthropic-ai/sdk';

/**
 * Prompt Templates for Offline Enrichment
 * These templates are used by background scripts to pre-process movie data.
 */

export interface MovieEnrichment {
  thematic_keywords: string[];
  genz_tags: string[];
  vibe_tags: string[];
  genre_blend_score: number;
  watch_with_who: string;
  recommendation_chains: string[][];
}

export const SCHEMA: Anthropic.Tool.InputSchema = {
  type: "object",
  properties: {
    thematic_keywords: {
      type: "array",
      items: { type: "string" },
      minItems: 5,
      maxItems: 8
    },
    genz_tags: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 5
    },
    vibe_tags: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 5
    },
    genre_blend_score: {
      type: "integer",
      minimum: 0,
      maximum: 100
    },
    watch_with_who: {
      type: "string",
      maxLength: 60  // rough char limit for ~10 words
    },
    recommendation_chains: {
      type: "array",
      items: {
        type: "array",
        items: { type: "string" },
        minItems: 3,
        maxItems: 3
      },
      minItems: 3,
      maxItems: 3
    }
  },
  required: ["thematic_keywords", "genz_tags", "vibe_tags", "genre_blend_score", "watch_with_who", "recommendation_chains"]
};

export const MOVIE_ENRICHMENT_PROMPT_TEMPLATE = `
<main_prompt>
Analyze the following movie and provide a specialized "Gen-Z" enrichment dataset.
This data will be used to power a discovery engine that matches users' vibes and moods.

MOVIE DATA:
Title: {{title}}
Overview: {{overview}}
Genres: {{genres}}
Release Date: {{releasedate}}

REQUIRED ATTRIBUTES (Return as JSON):

1. thematic_keywords: List 5-8 core thematic keywords that capture the essence of the film. Focus on abstract themes, emotional cores, or philosophical ideas—not just plot points.

2. genz_tags: 3-5 internet slang or cultural reference tags that describe the film's energy (e.g., "no thoughts head empty", "ate and left no crumbs", "main character energy", "it's giving unhinged", "lives in my head rent free").

3. vibe_tags: 3-5 mood or aesthetic descriptor tags (e.g., "melancholy", "chaotic", "cozy", "neon-noir", "liminal", "feral").

4. genre_blend_score: A single integer (0-100) representing how much of a hybrid "genre-bender" this movie is (0 = pure genre, 100 = impossible to categorize).

5. watch_with_who: A short, punchy suggestion of who to watch this with, under 10 words (e.g., "your situationship at 2am", "the besties during a mental breakdown", "alone, sobbing, no notes").

6. recommendation_chains: An array containing exactly 3 sub-arrays, each with 3 well-known movie titles. Each sub-array represents a different recommendation strategy:
   - First array: Intensity progression (escalating from less intense to more intense)
   - Second array: Vibe match across genres (similar mood/aesthetic but different genres)
   - Third array: Wavelength arc (if you're on this frequency, try these next)
   
   Example structure: [["Movie A", "Movie B", "Movie C"], ["Movie D", "Movie E", "Movie F"], ["Movie G", "Movie H", "Movie I"]]

SAFETY & CONSTRAINTS:
- Use clear, safe language.
- Ensure the Gen-Z tags are playful but recognizable.
- Return ONLY valid JSON.
</main_prompt>
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
