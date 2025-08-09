import { ipcMain } from 'electron'
import { IPC_CHANNELS } from '../channels'
import { readJSON, writeJSON } from '@main/utils/fs'

export async function registerFSHandlers(): Promise<void> {
  ipcMain.handle(IPC_CHANNELS.fs.readJSON, async (_event, filePath: string): Promise<any | null> => await readJSON(filePath))

  ipcMain.handle(IPC_CHANNELS.fs.writeJSON, async (_event, filePath: string, content: any): Promise<boolean> => await writeJSON(filePath, content))
}
