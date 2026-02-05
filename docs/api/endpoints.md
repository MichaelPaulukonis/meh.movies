# API Endpoints Spec

This document describes the internal API endpoints used by the meh.movies platform.

## 1. Movies

### GET `/api/movies`
Fetches a list of movies from the database.

**Query Parameters:**
- `limit` (optional): Number of movies to return (default: 12).

**Response:**
Returns an array of movie objects including title, overview, and vibe tags.

---

### GET `/api/movies/[id]`
Fetches detailed information for a single movie, including AI-enriched metadata.

**Response:**
Returns a single movie object with:
- Standard fields (title, overview, releaseDate, etc.)
- Enriched fields (`vibe_tags`, `genz_tags`, `thematic_keywords`, `genre_blend_score`, `watch_with_who`, `recommendation_chains`).

---

## 2. Recommendations

### POST `/api/recommendations`
Generates mood-based movie recommendations using Claude 3.5.

**Request Body:**
```json
{
  "mood": "string"
}
```

**Workflow:**
1. Sanitizes the `mood` input.
2. Fetches 20 enriched movies from the database as context.
3. Calls Claude 3.5 Sonnet to match the mood against the context.
4. Returns a hydrated list of matching movies with AI reasoning.

**Response:**
```json
{
  "recommendations": [
    {
      "movieId": 123,
      "title": "Movie Title",
      "reasoning": "Why Claude picked this movie...",
      "genres": "Action, Drama",
      ...
    }
  ]
}
```
