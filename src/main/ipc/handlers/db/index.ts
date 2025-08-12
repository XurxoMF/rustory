import { logger } from '@main/utils/logger'

import { registerConfigHandlers } from './config.handlers'

export async function registerDBHandlers() {
  logger.info('Registering config db handlers...')
  await registerConfigHandlers()
}
