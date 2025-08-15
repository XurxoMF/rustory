import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const vsAccount = sqliteTable('vs_account', {
  id: integer().primaryKey({ autoIncrement: true }).notNull().unique(),
  email: text().notNull(),
  playerName: text().notNull(),
  playerUid: text().notNull(),
  playerEntitlements: text().notNull(),
  sessionKey: text().notNull(),
  sessionSignature: text().notNull(),
  mptoken: text(),
  hostGameServer: integer({ mode: 'boolean' }).notNull()
})
