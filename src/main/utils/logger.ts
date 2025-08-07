import Logger from 'electron-log'

function logInfo(message: string): void {
  Logger.info(`[🟢 INFO] ${message}`)
}

function logWarn(message: string): void {
  Logger.warn(`[🟡 WARN] ${message}`)
}

function logError(message: string): void {
  Logger.error(`[🔴 ERROR] ${message}`)
}

function logDebug(message: string): void {
  Logger.debug(`[🔵 DEBUG] ${message}`)
}

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
