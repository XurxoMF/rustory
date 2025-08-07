import { app } from 'electron'

import { logger } from '@main/utils/logger'

import { registerTestHandlers } from './handlers/test.handlers'

export async function initIPCs(): Promise<void> {
  try {
    logger.info('Initializing IPCs...')

    logger.info('Registering test handlers...')
    await registerTestHandlers()

    logger.info('All IPCs initialized successfully.')
  } catch (err) {
    logger.error('Error initializing IPCs')
    logger.debug(`Error initializing IPCs: ${JSON.stringify(err)}`)
    app.exit(1)
  }
}
