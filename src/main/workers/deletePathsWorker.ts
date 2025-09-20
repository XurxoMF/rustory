import { parentPort, workerData } from 'worker_threads'
import fse from 'fs-extra'

const { paths } = workerData

for (const path of paths) {
  fse.removeSync(path)
}

parentPort?.postMessage('done')
