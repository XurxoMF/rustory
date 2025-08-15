import { parentPort, workerData } from 'worker_threads'
import fse from 'fs-extra'
import { join } from 'path'

import { logger } from '@main/utils/logger'

const { paths, perms } = workerData

const changePermissionsRecursively = (path: string): void => {
  if (fse.existsSync(path)) {
    const stats = fse.statSync(path)

    if (stats.isDirectory()) {
      const items = fse.readdirSync(path)
      for (const item of items) {
        changePermissionsRecursively(join(path, item))
      }
    }

    fse.chmodSync(path, perms)
  }
}

for (const path of paths) {
  logger.info(`Changing perms to ${path}...`)
  changePermissionsRecursively(path)
}

parentPort?.postMessage('done')
