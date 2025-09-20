import { ipcMain } from 'electron'

import { IPC_CHANNELS } from '@main/ipc/channels'
import { compress, extract } from '@main/utils/zip'

export async function registerZipHandlers(): Promise<void> {
  ipcMain.handle(
    IPC_CHANNELS.zip.extractor.extract,
    async (event, id: string, filePath: string, outputPath: string, deleteZip: boolean): Promise<boolean> =>
      await extract(
        (id, progress) => {
          event.sender.send(IPC_CHANNELS.zip.extractor.on.progress, id, progress)
        },
        id,
        filePath,
        outputPath,
        deleteZip
      )
  )

  ipcMain.handle(
    IPC_CHANNELS.zip.compressor.compress,
    async (event, id: string, inputPaths: string[], outputPath: string, outputFileName: string, compressionLevel: number | undefined): Promise<boolean> =>
      await compress(
        (id, progress) => {
          event.sender.send(IPC_CHANNELS.zip.compressor.on.progress, id, progress)
        },
        id,
        inputPaths,
        outputPath,
        outputFileName,
        compressionLevel
      )
  )
}
