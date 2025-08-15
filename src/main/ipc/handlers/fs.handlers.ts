import { app, ipcMain } from 'electron'
import { join } from 'path'

import { IPC_CHANNELS } from '@main/ipc/channels'
import { changePerms, openDialog, readJSON, writeJSON } from '@main/utils/fs'

export async function registerFSHandlers(): Promise<void> {
  ipcMain.handle(IPC_CHANNELS.fs.readJSON, async (_event, filePath: string): Promise<any | null> => await readJSON(filePath))

  ipcMain.handle(IPC_CHANNELS.fs.writeJSON, async (_event, filePath: string, content: any): Promise<boolean> => await writeJSON(filePath, content))

  ipcMain.handle(
    IPC_CHANNELS.fs.showDialog,
    async (_event, title: string, type: 'openFile' | 'openDirectory', multiple: boolean, extensions: string[]): Promise<string[] | null> => await openDialog(title, type, multiple, extensions)
  )

  ipcMain.handle(IPC_CHANNELS.fs.join, (_event, ...parts: string[]): string => join(...parts))

  ipcMain.handle(IPC_CHANNELS.fs.getPath, (_event, path: TPaths): string => app.getPath(path))

  ipcMain.handle(IPC_CHANNELS.fs.changePerms, async (_event, paths: string[], perms: number) => await changePerms(paths, perms))
}
