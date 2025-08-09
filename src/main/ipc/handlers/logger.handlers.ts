import { ipcMain } from 'electron'

import { IPC_CHANNELS } from '@main/ipc/channels'
import { logger } from '@main/utils/logger'

export async function registerLoggerHandlers(): Promise<void> {
  ipcMain.on(IPC_CHANNELS.logger.info, (_event, message: string): void => logger.info(message))

  ipcMain.on(IPC_CHANNELS.logger.warn, (_event, message: string): void => logger.warn(message))

  ipcMain.on(IPC_CHANNELS.logger.error, (_event, message: string): void => logger.error(message))

  ipcMain.on(IPC_CHANNELS.logger.debug, (_event, message: string): void => logger.debug(message))

  ipcMain.on(IPC_CHANNELS.logger.verbose, (_event, message: string): void => logger.verbose(message))
}
