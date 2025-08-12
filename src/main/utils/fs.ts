import fse from 'fs-extra'
import { dialog } from 'electron'

import { logger } from '@main/utils/logger'

/**
 * Reads a file as JSON and returns the content.
 *
 * @param filePath Path to the JSON file
 * @returns The JSON content or null if the file does not exist or an error occurs
 */
export async function readJSON(filePath: string): Promise<any | null> {
  try {
    if (!fse.existsSync(filePath)) {
      logger.warn(`JSON file at ${filePath} does not exist!`)
      return null
    }

    const json = await fse.readJSON(filePath, 'utf-8')

    return json
  } catch (err) {
    logger.error(`Error reading JSON file at ${filePath}!`)
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
    await fse.ensureFile(filePath)

    await fse.writeJSON(filePath, content, { spaces: 2 })

    return true
  } catch (err) {
    logger.error(`Error writing JSON file at ${filePath}!`)
    logger.debug(`Error writing JSON file at ${filePath}:\n${JSON.stringify(err)}`)
    return false
  }
}

/**
 * Open a file explorer dialog to select files or folders.
 *
 * @param title Title to show on the dialog
 * @param type Files or folders
 * @param multiple Multiple items or single item
 * @param extensions List of required file extensions
 * @returns The selected files/folders or null if the users selected nothing or an error ocurred
 */
export async function openDialog(title: string, type: 'openFile' | 'openDirectory', multiple: boolean, extensions: string[]): Promise<string[] | null> {
  try {
    const properties: ('openFile' | 'openDirectory' | 'multiSelections')[] = []
    properties.push(type)
    if (multiple) properties.push('multiSelections')

    const result = await dialog.showOpenDialog({
      title,
      properties,
      filters: extensions && [{ name: extensions.join(', '), extensions: extensions }]
    })

    if (result.canceled) {
      logger.warn('No file/folder was selected by the user!')
      return null
    }

    return result.filePaths
  } catch (err) {
    logger.error('Error opening file/folder selection dialog!')
    logger.debug(`Error file/folder selection dialog:\n${JSON.stringify(err)}`)
    return null
  }
}
