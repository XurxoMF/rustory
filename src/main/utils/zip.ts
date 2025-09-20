import { Worker } from 'worker_threads'
import { join } from 'path'

import { logger } from '@main/utils/logger'

import extractWorker from '@main/workers/extractWorker?modulePath'
import compressWorker from '@main/workers/compressWorker?modulePath'
import { RustoryZipError } from '@shared/errors/RustoryZipError'

/**
 * Extracts a zip to the selected path and reports the progress.
 * @param onProgress Callback to execute to report progress updates.
 * @param id ID of the process.
 * @param filePath Path of the zip to extract.
 * @param outputPath Path to extract the zip to.
 * @param deleteZip If the zip should be removed after extracting.
 * @returns If it was extracted or not.
 * @throws A {@link RustoryZipError} error.
 */
export async function extract(onProgress: (id: string, progress: number) => void, id: string, filePath: string, outputPath: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    logger.info(`[${id}] Extracting ${filePath} to ${outputPath}...`)

    const worker = new Worker(extractWorker, {
      workerData: { filePath, outputPath }
    })

    worker.on('message', (message) => {
      if (message.type === 'progress') {
        onProgress(id, message.progress)
      } else if (message.type === 'finished') {
        logger.info(`[${id}] Extraction of ${filePath} finished!`)
        resolve()
      } else {
        logger.error(`[${id}] Error extracting ${filePath}!`)
        logger.debug(`[${id}] Error extracting ${filePath}:\n${JSON.stringify(message)}`)
        reject(new RustoryZipError(`Error extracting ${filePath}!`, RustoryZipError.Codes.ZIP_ERROR))
      }
    })

    worker.on('error', (err) => {
      logger.error(`[${id}] Worker error extracting ${filePath}!`)
      logger.debug(`[${id}] Worker error extracting ${filePath}:\n${JSON.stringify(err)}`)
      reject(new RustoryZipError(`Worker error extracting ${filePath}!`, RustoryZipError.Codes.ZIP_ERROR))
    })

    worker.on('exit', (code) => {
      if (code !== 0) {
        logger.error(`[${id}] Worker exited with errors extracting ${filePath}!`)
        logger.debug(`[${id}] Worker exited with errors extracting ${filePath}. Code: ${code}`)
        reject(new RustoryZipError(`Worker exited with errors extracting ${filePath}!`, RustoryZipError.Codes.ZIP_ERROR))
      }
    })
  })
}

/**
 * Compress a path as zip and reports the progress.
 * @param onProgress Callback to execute to report progress updates.
 * @param id ID of the process.
 * @param inputPath Path to compress as zip.
 * @param outputPath Path to compress to.
 * @param outputFileName Name of the zip file.
 * @param compressionLevel Compress level of the file.
 * @returns If it was compressed or not.
 * @throws A {@link RustoryZipError} error.
 */
export async function compress(
  onProgress: (id: string, progress: number) => void,
  id: string,
  inputPaths: string[],
  outputPath: string,
  outputFileName: string,
  compressionLevel: number = 6
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const outFile = join(outputPath, outputFileName)

    logger.info(`[${id}] Compressing ${inputPaths.length} paths to ${outFile} with level ${compressionLevel}...`)

    const worker = new Worker(compressWorker, {
      workerData: { inputPaths, outputPath, outputFileName, compressionLevel }
    })

    worker.on('message', (message) => {
      if (message.type === 'progress') {
        onProgress(id, message.progress)
      } else if (message.type === 'finished') {
        logger.info(`[${id}] Compression of ${inputPaths.length} paths finished!`)
        resolve()
      } else {
        logger.error(`[${id}] Error compressing ${inputPaths.length} paths!`)
        logger.debug(`[${id}] Error compressing ${inputPaths.length} paths:\n${JSON.stringify(message)}`)
        reject(new RustoryZipError(`Error compressing ${inputPaths.length} paths!`, RustoryZipError.Codes.ZIP_ERROR))
      }
    })

    worker.on('error', (err) => {
      logger.error(`[${id}] Worker error compressing ${inputPaths.length} paths!`)
      logger.debug(`[${id}] Worker error compressing ${inputPaths.length} paths:\n${JSON.stringify(err)}`)
      reject(new RustoryZipError(`Worker error compressing ${inputPaths.length} paths!`, RustoryZipError.Codes.ZIP_ERROR))
    })

    worker.on('exit', (code) => {
      if (code !== 0) {
        logger.error(`[${id}] Worker exited with errors compressing ${inputPaths.length} paths!`)
        logger.debug(`[${id}] Worker exited with errors compressing ${inputPaths.length} paths. Code: ${code}`)
        reject(new RustoryZipError(`Worker exited with errors compressing ${inputPaths.length} paths!`, RustoryZipError.Codes.ZIP_ERROR))
      }
    })
  })
}
