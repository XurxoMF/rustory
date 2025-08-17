import { app, ipcMain } from 'electron'
import { IPC_CHANNELS } from '@main/ipc/channels'

export async function registerRustoryHandlers(): Promise<void> {
  ipcMain.handle(IPC_CHANNELS.rustory.getName, async (_event): Promise<string> => app.getName())

  ipcMain.handle(IPC_CHANNELS.rustory.getVersion, async (_event): Promise<string> => app.getVersion())
}
