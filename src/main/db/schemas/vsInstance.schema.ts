import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const vsInstance = sqliteTable('vs_instance', {
  id: integer().primaryKey({ autoIncrement: true }).notNull().unique(),
  name: text().notNull(),
  path: text().notNull(),
  version: text().notNull(),
  startParams: text().notNull(),
  backupsLimit: integer().notNull(),
  backupsAuto: integer({ mode: 'boolean' }).notNull(),
  compressionLevel: integer().notNull(),
  lastTimePlayed: integer().notNull(),
  totalTimePlayed: integer().notNull(),
  mesaGlThread: integer({ mode: 'boolean' }).notNull(),
  envVars: text().notNull()
})
