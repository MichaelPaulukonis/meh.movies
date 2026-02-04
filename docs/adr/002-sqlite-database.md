# ADR-002: Use SQLite for Data Persistence

**Date**: 2026-02-03
**Status**: Accepted
**Deciders**: Engineering Team
**Related**: ADR-001

## Context

The application needs to store and retrieve movie metadata and user ratings. The challenge provided two pre-populated SQLite database files: `movies.db` and `ratings.db`. We need to decide how to interact with these data sources and whether to migrate or keep them.

### Current Situation

- Data is provided in `db/movies.db` (movies table) and `db/ratings.db` (ratings table).
- The "Movies" data contains static metadata (title, overview, budget, etc.).
- The "Ratings" data contains user-movie interactions.
- We need to perform joins or aggregations (e.g., "average rating per movie") which typically require tables to be in the same database or attached.

## Decision

We decided to **use the provided SQLite databases directly** without migration, managing two separate database connections in the application layer.

### Implementation Strategy

- **Drivers**: Use `sqlite3` with the `sqlite` wrapper for Promise-based API.
- **Connection Management**: `src/db.ts` exports separate connection factories: `getMoviesDb()` and `getRatingsDb()`.
- **Aggregation**: Cross-database operations (like calculating average ratings for enrichment) will be handled in the application logic (Node.js) rather than complex SQL attachments, to keep the implementation simple and portable.

## Rationale

### Advantages of This Decision ✅

1.  **Simplicity**: No need for data migration scripts or setting up a separate server (Postgres/MySQL).
2.  **Compliance**: Adheres strictly to the provided assets of the code challenge.
3.  **Portability**: The entire database layer is contained within the `db/` folder, making the project easy to share and run.

### Disadvantages or Trade-offs ⚠️

1.  **Performance**: Application-side joins (fetching ratings for a movie separately) are slower than database-side joins. However, given the dataset size (sample of 50-100 movies for enrichment, or simple queries), this is negligible.
2.  **Consistency**: No foreign key enforcement between two separate database files.

### Alternatives Considered 🔄

1.  **Merge into Single DB**
    - **Pros**: Allows SQL `JOIN`s between movies and ratings.
    - **Cons**: Requires an initial migration step/script to copy data.
    - **Why not chosen**: Additional setup complexity not strictly required for the scope of the challenge.

2.  **Migrate to PostgreSQL**
    - **Pros**: Better scaling, vector extension support (pgvector).
    - **Cons**: Requires external dependencies/docker.
    - **Why not chosen**: Overkill for a "take-home" style assessment using a local dataset.

## Consequences

### Positive ✅

1.  **Immediate Start**: Development can proceed immediately without infrastructure setup.
2.  **Zero-Config**: The project runs simply by `pnpm install` and `pnpm run`, assuming the files are present.

### Negative ⚠️

1.  **Query Complexity**: We cannot write `SELECT * FROM movies JOIN ratings ...`. We must fetch movies, then query ratings by ID, or load aggregates into memory.

## Validation & Exit Criteria

- [x] Application can read from `movies.db`.
- [x] Application can read from `ratings.db`.
- [x] Enrichment script successfully associates ratings with movies.

## Future Considerations

- If the dataset grows to millions of rows, we should consider merging the SQLite files or migrating to a robust RDBMS.
