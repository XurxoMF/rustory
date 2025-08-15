import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const config = sqliteTable('config', {
  key: text().primaryKey().unique().notNull(),
  value: text().notNull()
})
