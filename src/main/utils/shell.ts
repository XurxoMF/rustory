import { shell } from 'electron'
import { logger } from '@main/utils/logger'

/**
 * Opens a URL using the best option available. Mail if it's mailto:, browser if it's http/s...
 *
 * @param url The URL to open
 */
export function openURL(url: string): void {
  try {
    shell.openExternal(url)
  } catch (err) {
    logger.error(`Error opening external URL: ${url}!`)
    logger.debug(`Error opening external URL: ${url}:\n${JSON.stringify(err)}`)
  }
}

/**
 * Opens a path using the best option available. Most of the times using the file explorer.
 *
 * @param path The path to open
 */
export async function openPath(path: string): Promise<void> {
  try {
    const err = await shell.openPath(path)
    if (err) throw err
  } catch (err) {
    logger.error(`Error opening path: ${path}!`)
    logger.debug(`Error opening path: ${path}:\n${JSON.stringify(err)}`)
  }
}
