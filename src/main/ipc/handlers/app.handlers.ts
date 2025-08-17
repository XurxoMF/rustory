import { app, ipcMain } from 'electron'

import { IPC_CHANNELS } from '@main/ipc/channels'

export async function registerAppHandlers(): Promise<void> {
  ipcMain.on(IPC_CHANNELS.fs.readJSON, (_event): void => app.exit(1))
}
