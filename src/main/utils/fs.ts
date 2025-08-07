import fse from 'fs-extra'

import { logger } from '@main/utils/logger'

/**
 * Reads a file as JSON and returns the content.
 *
 * @param filePath Path to the JSON file
 * @returns The JSON content or null if the file does not exist or an error occurs
 */
export async function readJSON(filePath: string): Promise<any | null> {
  try {
    logger.info(`Reading JSON file at ${filePath}`)

    if (!fse.existsSync(filePath)) {
      logger.warn(`JSON file at ${filePath} does not exist`)
      return null
    }

    const json = await fse.readJSON(filePath, 'utf-8')

    logger.info(`Successfully read JSON file at ${filePath}`)

    return json
  } catch (err) {
    logger.error(`Error reading JSON file at ${filePath}`)
    logger.debug(`Error reading JSON file at ${filePath}:\n${JSON.stringify(err)}`)
    return null
  }
}

/**
 * Writes a JSON object to a file.
 *
 * @param filePath Path to the JSON file
 * @param content JSON to write to the file
 * @returns If the operation was successful ro not
 */
export async function writeJSON(filePath: string, content: any): Promise<boolean> {
  try {
    logger.info(`Writing JSON file at ${filePath}`)

    await fse.ensureFile(filePath)

    await fse.writeJSON(filePath, content, { spaces: 2 })

    logger.info(`Successfully wrote JSON file at ${filePath}`)

    return true
  } catch (err) {
    logger.error(`Error writing JSON file at ${filePath}`)
    logger.debug(`Error writing JSON file at ${filePath}:\n${JSON.stringify(err)}`)
    return false
  }
}
