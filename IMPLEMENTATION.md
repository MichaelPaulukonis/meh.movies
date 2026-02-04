# Movie Systems Design - Implementation

This project implements an LLM-integrated system for movie data enrichment and personalized recommendations.

## Setup

1. **Install Dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure OpenAI:**
   Copy `.env.example` to `.env` and add your `OPENAI_API_KEY`.
   ```bash
   cp .env.example .env
   ```

## Tasks

### 1. Data Enrichment
This script takes a sample of 50 movies, calculates their average rating from the ratings database, and uses GPT-4o to generate:
- Sentiment analysis of the overview.
- Budget and Revenue tiers (Low/Medium/High).
- Production Effectiveness Score (1-10).
- Target Audience description.

**Run Enrichment:**
```bash
pnpm run enrich
```
The results are saved to `enriched_movies.json`.

### 2. Movie System Design
The system provides:
- **Natural Language Recommendations:** Based on movie context (titles, genres, overviews).
- **User Preference Summaries:** Analyzes a user's rating history to build a taste profile.

**Run System Test:**
```bash
pnpm run test-system
```

## Project Structure
- `src/db.ts`: SQLite connection logic.
- `src/enrichment.ts`: OpenAI prompt engineering for data enrichment.
- `src/system.ts`: recommendation and user analysis logic.
- `src/index.ts`: Data enrichment runner.
- `src/test_system.ts`: System capability demonstrator.
