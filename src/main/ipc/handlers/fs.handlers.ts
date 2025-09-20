import { app, ipcMain } from 'electron'
import { join } from 'path'

import { IPC_CHANNELS } from '@main/ipc/channels'
import { changePerms, deletePaths, openDialog, readJSON, writeJSON } from '@main/utils/fs'

export async function registerFSHandlers(): Promise<void> {
  ipcMain.handle(IPC_CHANNELS.fs.readJSON, async (_event, filePath: string): Promise<any | undefined> => await readJSON(filePath))

  ipcMain.handle(IPC_CHANNELS.fs.writeJSON, async (_event, filePath: string, content: any): Promise<boolean> => await writeJSON(filePath, content))

  ipcMain.handle(
    IPC_CHANNELS.fs.showDialog,
    async (_event, title: string, type: 'openFile' | 'openDirectory', multiple: boolean, extensions: string[]): Promise<string[]> => await openDialog(title, type, multiple, extensions)
  )

  ipcMain.handle(IPC_CHANNELS.fs.join, async (_event, ...parts: string[]): Promise<string> => join(...parts))

  ipcMain.handle(IPC_CHANNELS.fs.getPath, async (_event, path: TPaths): Promise<string> => app.getPath(path))

  ipcMain.handle(IPC_CHANNELS.fs.changePerms, async (_event, paths: string[], perms: number): Promise<void> => await changePerms(paths, perms))

  ipcMain.handle(IPC_CHANNELS.fs.deletePaths, async (_event, paths: string[]): Promise<void> => await deletePaths(paths))
}
