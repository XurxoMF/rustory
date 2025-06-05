import Database from "@tauri-apps/plugin-sql";

// Migrations imports
// Example: import { up as up001 } from "$lib/db/migrations/001_test";

import { log } from "$lib/utils/basics";

export class DB {
  /**
   * Singleton instance of the Info.
   */
  private static _instance: DB | null = null;

  /**
   * Get the instance of the Info.
   */
  static get instance(): DB {
    if (DB._instance === null) DB._instance = new DB();
    return DB._instance;
  }

  /**
   * Migrations to apply when loading the DB.
   */
  private static MIGRATIONS: DB.Migration[] = [];

  /**
   * The database instance.
   */
  private _connection: Database | null = null;

  private constructor() {}

  /**
   * Get's the database instance and applies migrations.
   */
  async init() {
    try {
      log("info", "[src/lib/classes/DB.svelte.ts > init()] Loading DB...");

      this._connection = await Database.load("sqlite:database.sqlite");

      // Ensure the migrations table exists.
      await this._connection.execute(
        "CREATE TABLE IF NOT EXISTS migrations (" +
          "id INTEGER PRIMARY KEY AUTOINCREMENT," +
          "name TEXT NOT NULL UNIQUE," +
          "applied_at TEXT NOT NULL DEFAULT (datetime('now'))" +
          ");"
      );

      const appliedMigrations = await this._connection.select<{ name: string }[]>(
        `SELECT name FROM migrations;`
      );
      const appliedNames = appliedMigrations.map((m) => m.name);

      log(
        "info",
        `[src/lib/classes/DB.svelte.ts > init()] Migrations applied: ${appliedMigrations.length}/${DB.MIGRATIONS.length}...`
      );

      for (const migration of DB.MIGRATIONS) {
        if (!appliedNames.includes(migration.name)) {
          log(
            "info",
            `[src/lib/classes/DB.svelte.ts > init()] Applying migration ${migration.name}...`
          );
          await migration.up(this._connection);
          await this._connection.execute(`INSERT INTO migrations (name) VALUES ($1);`, [
            migration.name,
          ]);
        }
      }

      log("info", "[src/lib/classes/DB.svelte.ts > init()] DB loaded.");
    } catch (e) {
      log("error", "[src/lib/classes/DB.svelte.ts > init()] Error loading DB!");
      log("debug", JSON.stringify(e));
      throw e;
    }
  }

  /**
   * Get the db instance.
   *
   * Throws an error if it's not yet initialized!
   */
  get connection(): Database {
    if (!this._connection) throw new Error("Database is not yet initialized!");
    return this._connection;
  }
}

export namespace DB {
  export type Migration = { name: string; up: (db: Database) => Promise<void> };
}
