import { app } from 'electron'

import { logger } from '@main/utils/logger'

import { registerLoggerHandlers } from './handlers/logger.handlers'

export async function initIPCs(): Promise<void> {
  try {
    logger.info('Initializing IPCs...')

    logger.info('Registering logger handlers...')
    await registerLoggerHandlers()

    logger.info('All IPCs initialized successfully!')
  } catch (err) {
    logger.error('Error initializing IPCs!')
    logger.debug(`Error initializing IPCs: ${JSON.stringify(err)}`)
    app.exit(1)
  }
}
