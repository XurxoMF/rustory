import { ipcMain } from 'electron'

import { IPC_CHANNELS } from '@main/ipc/channels'
import { notify } from '@main/utils/notification'

export async function registerNotificationsHandlers(): Promise<void> {
  ipcMain.on(IPC_CHANNELS.notifications.notify, (_event, title: string, body: string, onClick: () => void): void => notify(title, body, onClick))
}
