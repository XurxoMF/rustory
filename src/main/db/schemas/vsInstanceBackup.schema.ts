import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { vsInstance } from './vsInstance.schema'

export const vsInstanceBackup = sqliteTable('vs_instance_backup', {
  id: integer().primaryKey({ autoIncrement: true }).notNull().unique(),
  vsInstanceId: integer().references(() => vsInstance.id, { onDelete: 'set null', onUpdate: 'cascade' }),
  date: integer().notNull(),
  path: text().notNull()
})
