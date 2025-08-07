import { ipcMain } from 'electron'

import { IPC_CHANNELS } from '@main/ipc/channels'

export async function registerTestHandlers(): Promise<void> {
  ipcMain.on(IPC_CHANNELS.test.ping, (_event, test: string) => console.log(`Hola ${test}!`))
}
