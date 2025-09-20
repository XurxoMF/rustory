import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const vsInstanceBackup = sqliteTable('vs_instance_backup', {
  id: text().primaryKey().notNull().unique(),
  vsInstanceId: integer().notNull(),
  date: integer().notNull(),
  path: text().notNull()
})
