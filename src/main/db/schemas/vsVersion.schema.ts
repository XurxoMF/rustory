import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const vsVersion = sqliteTable('vs_version', {
  version: text().primaryKey().unique().notNull(),
  path: text().notNull()
})
