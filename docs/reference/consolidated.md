**Project: meh.movies — Gen-Z-ified LLM-Powered Movie Discovery App**

You are generating a **Nuxt 3 + TypeScript web application** using **SSR**, **Nuxt server routes**, and **SQLite**.
The goal is a small but production-ready demo app that showcases **LLM-enriched movie data**, **prompt engineering**, and **LLM-assisted discovery**, without being over-engineered.

You MUST follow the instructions in the order given.

---

## 0. GLOBAL RULES (IMPORTANT)

* Output **real, working code only** — no pseudocode
* Use **TypeScript everywhere**
* Prefer clarity over cleverness
* This is **production-ready but not enterprise**
* Follow Nuxt 3 conventions strictly
* **Do not invent requirements** not listed here
* If something is unspecified, make a reasonable default and document it in comments
* Assume this output will be merged into an **existing repo** (some scaffolding already exists)

---

## 1. TECH STACK & ARCHITECTURE

### Core Stack

* **Nuxt 3**
* **SSR enabled**
* **TypeScript**
* **SQLite**
* **Nuxt server routes** (`/server/api`)
* **Anthropic API** (for runtime LLM calls)
* Offline enrichment scripts already exist — integrate, do NOT re-invent them

### Rendering

* Server-side rendered app
* No client-only SPA shortcuts

---

## 2. DATABASE MODEL

### Existing Table: `movies`

Assume a SQLite database with this table already exists:

* movieid (PK)
* title
* imdbid
* overview
* productioncompanies
* releasedate
* budget
* revenue
* runtime
* language
* genres
* status

### Enrichment Storage (REQUIRED)

Create a **separate table** for LLM-generated enrichment data:

`movie_enrichment`

* movieid (FK)
* thematic_keywords
* genz_tags
* vibe_tags
* genre_blend_score
* watch_with_who
* recommendation_chain
* created_at

Use clean schemas and indexes where appropriate.

---

## 3. OFFLINE LLM ENRICHMENT (SCRIPTS)

Partial enrichment scripts already exist within `src/` - do assume they are complete nor accurate.

You must:

* Show **how enrichment data is consumed**, not regenerated
* Include example prompt templates used by those scripts
* Demonstrate safe prompt construction
* Document where enrichment fits in the pipeline

The 5 enrichment attributes are:

1. Thematic keyword extraction (+ Gen-Z flavored tags)
2. Vibe-Match tags (e.g. “cozy”, “chaotic”, “melancholy”)
3. Genre-blending score (hybrid percentage)
4. “Watch-with-who?” suggestions
5. “If you like X, you might like Y” recommendation chains

---

## 4. RUNTIME LLM USAGE (USER-DRIVEN)

At runtime, the app MUST:

* Allow users to select a **mood / vibe**
* Use Anthropic API to:

  * Interpret mood
  * Match against enriched movie data
  * Return curated movie selections

### Prompt Safety (MANDATORY)

You MUST explicitly implement:

* System vs user prompt separation
* User input sanitization
* Defensive prompt framing
* Guardrails against prompt injection
* Clear comments explaining why each defense exists

Free-text input may exist now or in the future — design accordingly.

---

## 5. API DESIGN (NUXT SERVER ROUTES)

Implement server routes for:

* Fetching movies
* Fetching enriched metadata
* Mood/vibe-based recommendations
* Natural-language discovery queries (optional but encouraged)

Each route must include:

* Request/response typing
* Input validation
* Error handling
* Clear HTTP status codes
* Comments explaining behavior

---

## 6. FRONTEND PAGES (INITIAL SCOPE)

Create the following pages:

1. **Home / Discovery**

   * Movie feed
   * Vibe / mood selector
   * Emoji-forward Gen-Z copy (light, not cringe)
2. **Movie Detail Page**

   * Base movie data
   * Enriched metadata surfaced meaningfully
3. **Natural-Language Search**

   * “Show me cozy movies for a rainy night”
   * Uses runtime Anthropic calls

Accessibility matters. Don’t ignore it.

---

## 7. DESIGN CONSTRAINTS (ORDER MATTERS)

* **FUNCTIONALITY FIRST**
* Initial design: black-on-white, generic, readable
* Include a **dark-mode toggle**
* After functionality:

  * Gen-Z-ified copy
  * Playful tone
  * Emojis
  * “weird internet” vibes
* Use Tailwind lightly and cleanly
* Do NOT over-design early

---

## 8. CODE QUALITY REQUIREMENTS

All generated code must include:

* Proper file structure
* Clear separation of concerns
* Meaningful naming
* Inline comments for non-obvious logic
* JSDoc where helpful
* Type safety everywhere
* Error handling and edge-case awareness

---

## 9. OUTPUT REQUIREMENTS (STRICT)

You MUST output:

* Nuxt app code
* Server routes
* Database schema additions
* Example enrichment prompt templates
* Example runtime Anthropic prompts
* README with:

  * Setup instructions
  * How enrichment works
  * How runtime LLM calls work
  * Security considerations
* Usage examples
* No explanatory essay outside the README

Prefer **file-by-file output** with clear headings.

---

## 10. FINAL REMINDER

This project demonstrates:

* Prompt engineering
* LLM-augmented systems
* Data enrichment
* Thoughtful architecture
* Tasteful restraint

Build it like a senior engineer would.

**Begin generation now.**
