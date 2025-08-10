import { app, ipcMain } from 'electron'
import { IPC_CHANNELS } from '@main/ipc/channels'

export async function registerRustoryHandlers(): Promise<void> {
  ipcMain.handle(IPC_CHANNELS.rustory.getName, (_event): string => app.getName())

  ipcMain.handle(IPC_CHANNELS.rustory.getVersion, (_event): string => app.getVersion())
}
