import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { app } from 'electron'
import { join } from 'path'

import { logger } from '@main/utils/logger'

// Schema imports
import { config } from './schemas/config.schema'
import { vsAccount } from './schemas/vsAccount.schema'
import { vsInstance } from './schemas/vsInstance.schema'
import { vsInstanceBackup } from './schemas/vsInstanceBackup.schema'
import { vsVersion } from './schemas/vsVersion.schema'

let db: LibSQLDatabase<Record<string, unknown>>

async function initDB(): Promise<void> {
  // If the database is already initialized, return
  if (db) return

  try {
    logger.info('Loading database...')

    // Load the database
    db = drizzle(`file:${join(app.getPath('userData'), 'rustory.db')}`, { casing: 'snake_case' })

    logger.info('Database loaded! Applying migrations...')

    // Migrations
    await migrate(db, { migrationsFolder: join(__dirname, 'migrations') })

    logger.info('Migrations applied successfully!')
  } catch (err) {
    logger.error('Failed to load database!')
    logger.debug(`Failed to load database:\n${JSON.stringify(err)}`)
    app.exit(1)
  }
}

export { initDB, db, config, vsAccount, vsInstance, vsInstanceBackup, vsVersion }
