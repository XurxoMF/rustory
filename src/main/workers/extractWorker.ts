import { parentPort, workerData } from 'worker_threads'
import yauzl from 'yauzl'
import fse from 'fs-extra'
import path from 'path'

const { filePath, outputPath } = workerData

yauzl.open(filePath, { lazyEntries: true }, (err, zipfile) => {
  if (err) {
    parentPort?.postMessage({ type: 'error', error: err })
    return
  }

  const totalFiles = zipfile.entryCount
  let extractedCount = 0
  let lastReportedProgress = 0

  zipfile.readEntry()

  zipfile.on('entry', (entry) => {
    const fullPath = path.join(outputPath, entry.fileName)

    if (/\/$/.test(entry.fileName)) {
      fse.ensureDirSync(fullPath)
      extractedCount++
      const progress = Math.round((extractedCount / totalFiles) * 100)
      if (progress > lastReportedProgress) {
        lastReportedProgress = progress
        parentPort?.postMessage({
          type: 'progress',
          progress
        })
      }

      if (extractedCount === totalFiles) {
        zipfile.close()

        parentPort?.postMessage({ type: 'finished' })
      } else {
        zipfile.readEntry()
      }
    } else {
      zipfile.openReadStream(entry, (err, readStream) => {
        if (err) {
          parentPort?.postMessage({ type: 'error', error: err })
          zipfile.readEntry()
          return
        }

        fse.ensureDirSync(path.dirname(fullPath))
        const writeStream = fse.createWriteStream(fullPath)

        readStream.pipe(writeStream)

        writeStream.on('error', (err) => {
          parentPort?.postMessage({ type: 'error', error: err })
          zipfile.readEntry()
        })

        writeStream.on('finish', () => {
          extractedCount++
          const progress = Math.round((extractedCount / totalFiles) * 100)
          if (progress > lastReportedProgress) {
            lastReportedProgress = progress
            parentPort?.postMessage({
              type: 'progress',
              progress
            })
          }

          if (extractedCount === totalFiles) {
            zipfile.close()

            parentPort?.postMessage({ type: 'finished' })
          } else {
            zipfile.readEntry()
          }
        })

        writeStream.on('error', (err) => {
          parentPort?.postMessage({ type: 'error', error: err })
        })
      })
    }
  })

  zipfile.on('error', (err) => {
    parentPort?.postMessage({ type: 'error', error: err })
  })
})
