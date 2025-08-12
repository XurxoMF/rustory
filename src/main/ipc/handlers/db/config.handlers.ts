import { ipcMain } from 'electron'
import { IPC_CHANNELS } from '@main/ipc/channels'
import { getItem, setItem } from '@main/utils/db/config'

export async function registerConfigHandlers(): Promise<void> {
  ipcMain.handle(IPC_CHANNELS.db.config.getItem, async (_event, key: string): Promise<string | null> => await getItem(key))

  ipcMain.handle(IPC_CHANNELS.db.config.setItem, async (_event, key: string, value: string): Promise<boolean> => await setItem(key, value))
}
