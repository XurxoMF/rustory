import { db, vsInstance } from '@main/db'
import { logger } from '@main/utils/logger'
import { RustoryDBError } from '@shared/errors/RustoryDBError'
import { eq } from 'drizzle-orm'

/**
 * Get all the VS Instances from the DB.
 * @returns The VS Instances found.
 * @throws A {@link RustoryDBError} error.
 */
export async function getVSInstances(): Promise<VSInstanceType[]> {
  try {
    const instances = await db.select().from(vsInstance)

    return instances
  } catch (err) {
    logger.error('Error getting the VS Instances from the DB!')
    logger.debug(`Error getting the VS Instances from the DB:\n${JSON.stringify(err)}`)
    throw new RustoryDBError('Error getting the VS Instances from the DB!', RustoryDBError.Codes.DB_ERROR)
  }
}

/**
 * Add or update a VS Instance to the DB.
 * @param instance Thew VS Instance to save.
 * @returns If it was saved or not.
 * @throws A {@link RustoryDBError} error.
 */
export async function saveVSInstance(instance: VSInstanceType): Promise<void> {
  try {
    const inserted = await db.insert(vsInstance).values(instance).onConflictDoUpdate({ target: vsInstance.id, set: instance })

    if (inserted.rowsAffected < 1) throw new RustoryDBError('No Instance was upserted on the DB!', RustoryDBError.Codes.DB_ERROR)
  } catch (err) {
    logger.error('Error upserting a VS Instance on the DB!')
    logger.debug(`Error upserting a VS Instance on the DB:\n${JSON.stringify(err)}`)
    throw new RustoryDBError('Error upserting VS Instance on the DB!', RustoryDBError.Codes.DB_ERROR)
  }
}

/**
 * Delete a VS Instance from the DB.
 * @param instance The VS Instance to delete.
 * @throws A {@link RustoryDBError} error.
 */
export async function deleteVSInstance(instance: VSInstanceType): Promise<void> {
  try {
    const deleted = await db.delete(vsInstance).where(eq(vsInstance.id, instance.id))

    if (deleted.rowsAffected < 1) throw new RustoryDBError('No Instance was deleted from the DB!', RustoryDBError.Codes.DB_ERROR)
  } catch (err) {
    logger.error('Error deleting a VS Instance from the DB!')
    logger.debug(`Error deleting a VS Instance from the DB:\n${JSON.stringify(err)}`)
    throw new RustoryDBError('Error deleting a VS Instance from the DB!', RustoryDBError.Codes.DB_ERROR)
  }
}
