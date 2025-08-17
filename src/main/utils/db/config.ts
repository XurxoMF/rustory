import { config, db } from '@main/db'
import { logger } from '@main/utils/logger'
import { RustoryDBError } from '@shared/errors/RustoryDBError'
import { eq } from 'drizzle-orm'

/**
 * Search the DB for the pair key <-> value.
 *
 * @param key The key to search.
 * @returns The value found.
 * @throws A {@link RustoryDBError} error.
 */
export async function getItem(key: string): Promise<string | undefined> {
  try {
    const items = await db.select().from(config).where(eq(config.key, key)).limit(1)

    if (items.length < 1) return

    return items[0].value
  } catch (err) {
    logger.error('Error getting a config from the DB!')
    logger.debug(`Error getting a config from the DB:\n${JSON.stringify(err)}`)
    throw new RustoryDBError('Error getting a config from the DB!', RustoryDBError.Codes.DB_ERROR)
  }
}

/**
 * Add or update a pair key <-> value to the DB.
 *
 * @param key The key to save.
 * @param value Thew value to save.
 * @returns If it was saved or not.
 * @throws A {@link RustoryDBError} error.
 */
export async function setItem(key: string, value: string): Promise<boolean> {
  try {
    const inserted = await db.insert(config).values({ key, value }).onConflictDoUpdate({ target: config.key, set: { key, value } })

    if (inserted.rowsAffected < 1) return false

    return true
  } catch (err) {
    logger.error('Error upserting a config on the DB!')
    logger.debug(`Error upserting a config on the DB:\n${JSON.stringify(err)}`)
    throw new RustoryDBError('Error upserting a config on the DB!', RustoryDBError.Codes.DB_ERROR)
  }
}
