import { Worker } from 'worker_threads'
import { join } from 'path'

import { logger } from '@main/utils/logger'

import downloadWorker from '@main/workers/downloadWorker?modulePath'

/**
 * Download a file on the specified directory and reports the progress.
 *
 * @param onProgress Callback to execute to report progress updates
 * @param id ID of the process
 * @param url URL to download
 * @param outputPath Path to download the file to
 * @param fileName Name of the resulting file
 * @returns If it was downloaded successfully or not
 */
export async function download(onProgress: (id: string, progress: number) => void, id: string, url: string, outputPath: string, fileName: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const outFile = join(outputPath, fileName)

    logger.info(`[${id}] Downloading ${url} on ${outFile}...`)

    const worker = new Worker(downloadWorker, {
      workerData: { id, url, outputPath, fileName }
    })

    worker.on('message', (message) => {
      if (message.type === 'progress') {
        onProgress(id, message.progress)
      } else if (message.type === 'finished') {
        logger.info(`[${id}] Download of ${url} finished!`)
        resolve(true)
      } else {
        logger.error(`[${id}] [${fileName}] Error downloading ${url}!`)
        logger.debug(`[${id}] [${fileName}] Error downloading ${url}:\n${JSON.stringify(message.error)}`)
      }
    })

    worker.on('error', (err) => {
      logger.error(`[${id}] [${fileName}] Worker error downloading ${url}!`)
      logger.debug(`[${id}] [${fileName}] Worker error downloading ${url}:\n${JSON.stringify(err.message)}`)
      reject(false)
    })

    worker.on('exit', (code) => {
      if (code !== 0) {
        logger.warn(`[${id}] [${fileName}] Worker exited with errors downloading ${url}!`)
        logger.debug(`[${id}] [${fileName}] Worker exited with errors downloading ${url}. Code: ${code}`)
        reject(false)
      }
    })
  })
}
