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
import { RustoryDBError } from '@shared/errors/RustoryDBError'

let db: LibSQLDatabase<Record<string, unknown>>

/**
 * Loads the database and apply migrations.
 * @throws A {@link RustoryDBError} error.
 */
async function initDB(): Promise<void> {
  // If the database is already initialized, return
  if (db) return

  logger.info('Loading database...')

  try {
    // Load the database
    db = drizzle(`file:${join(app.getPath('userData'), 'rustory.db')}`, { casing: 'snake_case' })
  } catch (err) {
    logger.error('Failed to load database!')
    logger.debug(`Failed to load database:\n${JSON.stringify(err)}`)
    throw new RustoryDBError('Failed to load database!', RustoryDBError.Codes.INIT_ERROR)
  }

  logger.info('Database loaded! Applying migrations...')

  try {
    // Migrations
    await migrate(db, { migrationsFolder: join(__dirname, 'migrations') })
  } catch (err) {
    logger.error('Failed to apply migrations!')
    logger.debug(`Failed to apply migrations:\n${JSON.stringify(err)}`)
    throw new RustoryDBError('Failed to apply migrations!', RustoryDBError.Codes.MIGRATION_ERROR)
  }

  logger.info('Migrations applied successfully!')
}

export { initDB, db, config, vsAccount, vsInstance, vsInstanceBackup, vsVersion }
