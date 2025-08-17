import { ipcMain } from 'electron'
import { IPC_CHANNELS } from '@main/ipc/channels'
import { openPath, openURL } from '@main/utils/shell'

export async function registerShellHandlers(): Promise<void> {
  ipcMain.on(IPC_CHANNELS.shell.openURL, (_event, url: string): void => openURL(url))

  ipcMain.on(IPC_CHANNELS.shell.openPath, async (_event, path: string): Promise<void> => await openPath(path))
}
