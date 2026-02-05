This assessment is designed for a Senior AI Engineer role and should take approximately 2-3 hours to complete. It focuses on testing your problem-solving skills, coding proficiency (in either Python or TypeScript with Node.js), data handling, SQL querying, and expertise in integrating and leveraging large language models (LLMs) for AI applications, with a strong emphasis on prompt engineering, LLM output generation, and evaluation. You'll work with a provided SQLite database containing movie-related data. The emphasis is on using LLMs to enrich data, generate outputs, and build intelligent systems through effective prompting.

## **The Databases**

* The databases are provided as a SQLite3 database in `db/`.  It does not require any credentials to login.  You can run SQL queries directly against the database using:

The movies table has the following columns:

* movieid: Unique identifier for each movie.
* title: Movie title.
* imdbid: IMDb identifier.
* overview: Brief description of the movie.
* productioncompanies: Pipe-separated list of production companies.
* releasedate: Release date of the movie.
* budget: Production budget in USD.
* revenue: Box office revenue in USD.
* runtime: Movie runtime in minutes.
* genres: Pipe-separated list of genres (e.g., "Action|Drama").
* status: Release status (e.g., "Released").

## Tasks

#### Data Preparation & data enrichment

For a sample of 50-100 movies, Use prompts to generate additional 5 additional attributes for the provided movies data.
Examples include:

#### Movie System Design

Develop an LLM-integrated system for movie-related tasks (e.g., recommendations, rating predictions, or natural language querying)
We will be using Anthropic API with an API key to follow.
Use best practices and guard against prompt injection if user-defined text is allowed

5 additional attributes:

- thematic keyword extraction (use to generate tags for sorting) - follow this up with gen-z tags tho
- “Vibe‑Match” tags – Have the LLM assign short vibe tags (e.g., “cozy”, “chaotic”, “melancholy”) to each movie from the  overview  and genres. (same as 1?)
- “Genre‑blending score” – Score how “hybrid” the movie is (e.g., “70% thriller, 30% comedy”) from the  genres  and  overview .
- Watch‑with‑who?” suggestions – LLM suggests ideal companion types (e.g., “date night”, “friends hangout”, “solo catharsis”) for each movie.
- “If you like X, you might like Y” chains – Use LLMs to generate small chains of movies that form a coherent “watch‑this‑next” path.

## design-style/vibe

Do the whole thing as a "gen-z-ified movie site" - graphics pop, words, emojis, etc.
DO THE DESIGN LAST - focus on functionality first (Except for the text/data)
After main work is done, the design will be more of a kandy-kolored gen-z weirdo-internet vibe thing.

The layout of the website is not included in this document. You will ask me questions about the layout and details as listed above to