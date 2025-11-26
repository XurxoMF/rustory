import { ipcMain } from 'electron'

import { IPC_CHANNELS } from '@main/ipc/channels'
import { getVSVersion } from '@main/utils/vs'

export async function registerFSHandlers(): Promise<void> {
  ipcMain.handle(IPC_CHANNELS.vs.getVersion, async (_event, path: string): Promise<any | undefined> => await getVSVersion(path))
}
