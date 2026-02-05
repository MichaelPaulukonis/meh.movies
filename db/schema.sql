-- Schema for movie enrichment data
CREATE TABLE IF NOT EXISTS movie_enrichment (
    movieid INTEGER PRIMARY KEY,
    thematic_keywords TEXT, -- JSON array of strings
    genz_tags TEXT, -- JSON array of strings
    vibe_tags TEXT, -- JSON array of strings
    genre_blend_score INTEGER, -- 1-100 percentage
    watch_with_who TEXT, -- JSON array or string
    recommendation_chain TEXT, -- JSON array of recommended movie titles/IDs
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movieid) REFERENCES movies(movieid)
);

CREATE INDEX IF NOT EXISTS idx_movie_enrichment_movieid ON movie_enrichment(movieid);
