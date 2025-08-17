import Logger from 'electron-log'

/**
 * Logs a message with info level.
 *
 * @param message The message to log.
 */
function logInfo(message: string): void {
  Logger.info(`[🟢 INFO] ${message}`)
}

/**
 * Logs a message with warn level.
 *
 * @param message The message to log.
 */
function logWarn(message: string): void {
  Logger.warn(`[🟡 WARN] ${message}`)
}

/**
 * Logs a message with error level.
 *
 * @param message The message to log.
 */
function logError(message: string): void {
  Logger.error(`[🔴 ERROR] ${message}`)
}

/**
 * Logs a message with debug level.
 *
 * @param message The message to log.
 */
function logDebug(message: string): void {
  Logger.debug(`[🔵 DEBUG] ${message}`)
}

/**
 * Logs a message with verbose level.
 *
 * @param message The message to log.
 */
function logVerbose(message: string): void {
  Logger.verbose(`[🟣 VERBOSE] ${message}`)
}

export const logger = {
  info: logInfo,
  warn: logWarn,
  error: logError,
  debug: logDebug,
  verbose: logVerbose
}
