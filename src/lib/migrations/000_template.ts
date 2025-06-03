// DON'T EXECUTE THIS MIGRTION
// THIS IS AN EXAMPLE TEMPLATE

import type Database from "@tauri-apps/plugin-sql";

export async function up(db: Database) {
  // Execute any code needed here.
  // SELECT, CREATE TABLE, PRAGMA...

  await db.execute("SELECT * FROM something;");
}
