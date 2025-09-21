import { db, vsVersion } from '@main/db'
import { logger } from '@main/utils/logger'
import { RustoryDBError } from '@shared/errors/RustoryDBError'
import { eq } from 'drizzle-orm'

/**
 * Get all the versions from the DB.
 * @returns The versions found.
 * @throws A {@link RustoryDBError} error.
 */
export async function getVSVersions(): Promise<TVSVersion[]> {
  try {
    const versions = await db.select().from(vsVersion)

    return versions
  } catch (err) {
    logger.error('Error getting the versions from the DB!')
    logger.debug(`Error getting the versions from the DB:\n${JSON.stringify(err)}`)
    throw new RustoryDBError('Error getting the versions from the DB!', RustoryDBError.Codes.DB_ERROR)
  }
}

/**
 * Add or update a version to the DB.
 * @param version Thew version to save.
 * @returns If it was saved or not.
 * @throws A {@link RustoryDBError} error.
 */
export async function saveVSVersion(version: TVSVersion): Promise<void> {
  try {
    const inserted = await db.insert(vsVersion).values(version).onConflictDoUpdate({ target: vsVersion.version, set: version })

    if (inserted.rowsAffected < 1) throw new RustoryDBError('No version was upserted on the DB!', RustoryDBError.Codes.DB_ERROR)
  } catch (err) {
    logger.error('Error upserting a version on the DB!')
    logger.debug(`Error upserting a version on the DB:\n${JSON.stringify(err)}`)
    throw new RustoryDBError('Error upserting version on the DB!', RustoryDBError.Codes.DB_ERROR)
  }
}

/**
 * Delete a version from the DB.
 * @param version The version to delete.
 * @throws A {@link RustoryDBError} error.
 */
export async function deleteVSVersion(version: TVSVersion): Promise<void> {
  try {
    const deleted = await db.delete(vsVersion).where(eq(vsVersion.version, version.version))

    if (deleted.rowsAffected < 1) throw new RustoryDBError('No version was deleted from the DB!', RustoryDBError.Codes.DB_ERROR)
  } catch (err) {
    logger.error('Error deleting a version from the DB!')
    logger.debug(`Error deleting a version from the DB:\n${JSON.stringify(err)}`)
    throw new RustoryDBError('Error deleting a version from the DB!', RustoryDBError.Codes.DB_ERROR)
  }
}
