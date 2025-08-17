import { ipcMain } from 'electron'

import { IPC_CHANNELS } from '@main/ipc/channels'
import { download, request } from '@main/utils/net'

export async function registerNetHandlers(): Promise<void> {
  ipcMain.handle(
    IPC_CHANNELS.net.downloader.download,
    async (event, id: string, url: string, outputPath: string, fileName: string): Promise<void> =>
      await download(
        (id, progress) => {
          event.sender.send(IPC_CHANNELS.net.downloader.on.progress, id, progress)
        },
        id,
        url,
        outputPath,
        fileName
      )
  )

  ipcMain.handle(IPC_CHANNELS.net.request, async (_event, url: string): Promise<string> => await request(url))
}
