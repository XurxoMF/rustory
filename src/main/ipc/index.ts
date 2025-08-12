import { app } from 'electron'

import { logger } from '@main/utils/logger'

import { registerLoggerHandlers } from './handlers/logger.handlers'
import { registerFSHandlers } from './handlers/fs.handlers'
import { registerSystemHandlers } from './handlers/system.handlers'
import { registerWindowHandlers } from './handlers/window.handler'
import { registerShellHandlers } from './handlers/shell.handlers'
import { registerRustoryHandlers } from './handlers/rustory.handlers'
import { registerDBHandlers } from './handlers/db'

export async function initIPCs(): Promise<void> {
  try {
    logger.info('Initializing IPCs...')

    logger.info('Registering logger handlers...')
    await registerLoggerHandlers()

    logger.info('Registering fs handlers...')
    await registerFSHandlers()

    logger.info('Registering system handlers...')
    await registerSystemHandlers()

    logger.info('Registering window handlers...')
    await registerWindowHandlers()

    logger.info('Registering shell handlers...')
    await registerShellHandlers()

    logger.info('Registering rustory handlers...')
    await registerRustoryHandlers()

    logger.info('Registering db handlers...')
    await registerDBHandlers()

    logger.info('All IPCs initialized successfully!')
  } catch (err) {
    logger.error('Error initializing IPCs!')
    logger.debug(`Error initializing IPCs:\n${JSON.stringify(err)}`)
    app.exit(1)
  }
}
