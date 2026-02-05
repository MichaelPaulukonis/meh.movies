import { createRequire } from 'node:module';
import { open, Database } from 'sqlite';
import path from 'path';

const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3');

let moviesDb: Database | null = null;

export async function useMoviesDb(): Promise<Database> {
  if (moviesDb) return moviesDb;
  
  // Resolve path relative to project root
  const dbPath = path.resolve(process.cwd(), 'db/movies.db');
  
  moviesDb = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
  
  return moviesDb;
}
