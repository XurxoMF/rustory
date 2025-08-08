import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { app } from 'electron'
import { join } from 'path'

import { logger } from '@main/utils/logger'

// Schema imports
import { test } from './schemas/test.schema'

let db: LibSQLDatabase<Record<string, unknown>> | null = null

async function initDB(): Promise<void> {
  // If the database is already initialized, return
  if (db) return

  try {
    logger.info('Loading database...')

    // Load the database
    db = drizzle(`file:${join(app.getPath('userData'), 'rustory.db')}`)

    logger.info('Database loaded! Applying migrations...')

    // Migrations
    migrate(db, { migrationsFolder: join(__dirname, 'migrations') })

    logger.info('Migrations applied successfully!')
  } catch (err) {
    logger.error('Failed to load database!')
    logger.debug(`Failed to load database: ${JSON.stringify(err)}`)
    app.exit(1)
  }
}

export { initDB, db, test }
