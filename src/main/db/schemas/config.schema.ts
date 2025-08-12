import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const config = sqliteTable('config', {
  key: text().notNull().unique(),
  value: text().notNull()
})
