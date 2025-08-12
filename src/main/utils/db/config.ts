import { config, db } from '@main/db'
import { logger } from '@main/utils/logger'
import { eq } from 'drizzle-orm'

export async function getItem(key: string): Promise<string | null> {
  try {
    const items = await db.select().from(config).where(eq(config.key, key)).limit(1)

    if (items.length < 1) return null

    return items[0].value
  } catch (err) {
    logger.error('Error selecting a config from the DB!')
    logger.debug(`Error selecting a config from the DB:\n${JSON.stringify(err)}`)
    return null
  }
}

export async function setItem(key: string, value: string): Promise<boolean> {
  try {
    const inserted = await db.insert(config).values({ key, value }).onConflictDoUpdate({ target: config.key, set: { key, value } })

    if (inserted.rowsAffected < 1) return false

    return true
  } catch (err) {
    logger.error('Error upserting a config on the DB!')
    logger.debug(`Error upserting a config on the DB:\n${JSON.stringify(err)}`)
    return false
  }
}
