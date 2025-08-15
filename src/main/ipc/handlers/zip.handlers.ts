import { ipcMain } from 'electron'

import { IPC_CHANNELS } from '@main/ipc/channels'
import { compress, extract } from '@main/utils/zip'

export async function registerZipHandlers(): Promise<void> {
  ipcMain.handle(
    IPC_CHANNELS.zip.extractor.extract,
    async (event, id: string, filePath: string, outputPath: string, deleteZip: boolean) =>
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
    async (event, id: string, inputPath: string, outputPath: string, outputFileName: string, compressionLevel?: number) =>
      await compress(
        (id, progress) => {
          event.sender.send(IPC_CHANNELS.zip.compressor.on.progress, id, progress)
        },
        id,
        inputPath,
        outputPath,
        outputFileName,
        compressionLevel
      )
  )
}
