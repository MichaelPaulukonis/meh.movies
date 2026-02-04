import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export async function getMoviesDb(): Promise<Database> {
    return open({
        filename: './db/movies.db',
        driver: sqlite3.Database
    });
}

export async function getRatingsDb(): Promise<Database> {
    return open({
        filename: './db/ratings.db',
        driver: sqlite3.Database
    });
}
