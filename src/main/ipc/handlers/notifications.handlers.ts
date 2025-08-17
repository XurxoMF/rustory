import { ipcMain } from 'electron'

import { IPC_CHANNELS } from '@main/ipc/channels'
import { notify } from '@main/utils/notification'

export async function registerNotificationsHandlers(): Promise<void> {
  ipcMain.handle(
    IPC_CHANNELS.notifications.notify,
    async (event, title: string, body: string): Promise<string> => notify(title, body, (id) => event.sender.send(IPC_CHANNELS.notifications.on.click, id))
  )
}
