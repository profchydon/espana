import Database from "better-sqlite3";
import { env } from "@/lib/env";

const DB_PATH = env.databasePath;

let db: Database.Database | undefined;

function initDb(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      company_name TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS user_settings (
      user_id INTEGER PRIMARY KEY,
      legal_business_name TEXT NOT NULL,
      registration_number TEXT NOT NULL DEFAULT '',
      tax_id TEXT NOT NULL DEFAULT '',
      business_address TEXT NOT NULL DEFAULT '',
      base_currency TEXT NOT NULL DEFAULT 'EUR',
      financial_year_end TEXT NOT NULL DEFAULT '12-31',
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
}

export function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    initDb(db);
  }
  return db;
}
