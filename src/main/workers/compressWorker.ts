import { parentPort, workerData } from 'worker_threads'
import archiver from 'archiver'
import fse from 'fs-extra'
import { join, basename } from 'path'

const {
  inputPaths,
  outputPath,
  outputFileName,
  compressionLevel = 6
} = workerData as {
  inputPaths: string[]
  outputPath: string
  outputFileName: string
  compressionLevel?: number
}

const output = fse.createWriteStream(join(outputPath, outputFileName))
const archive = archiver('zip', { zlib: { level: compressionLevel } })

let totalFiles = 0
let lastReportedProgress = 0

function countFiles(targetPath: string): void {
  const stat = fse.statSync(targetPath)

  if (stat.isDirectory()) {
    const entries = fse.readdirSync(targetPath, { withFileTypes: true })
    for (const entry of entries) {
      countFiles(join(targetPath, entry.name))
    }
  } else {
    totalFiles++
  }
}

try {
  for (const p of inputPaths) {
    countFiles(p)
  }

  if (!fse.existsSync(outputPath)) {
    fse.mkdirSync(outputPath, { recursive: true })
  }

  archive.on('progress', ({ entries }) => {
    const progress = Math.floor((entries.processed / totalFiles) * 100)
    if (progress > lastReportedProgress) {
      lastReportedProgress = progress
      parentPort?.postMessage({ type: 'progress', progress })
    }
  })

  archive.on('error', (err) => {
    parentPort?.postMessage({ type: 'error', message: `Unexpected error: ${err}` })
  })

  output.on('close', () => {
    parentPort?.postMessage({ type: 'progress', progress: 100 })
    parentPort?.postMessage({ type: 'finished' })
  })

  archive.pipe(output)

  for (const p of inputPaths) {
    const stat = fse.statSync(p)
    if (stat.isDirectory()) {
      archive.directory(p, basename(p))
    } else {
      archive.file(p, { name: basename(p) })
    }
  }

  archive.finalize()
} catch (err) {
  parentPort?.postMessage({ type: 'error', message: `Unexpected error: ${err}` })
}
