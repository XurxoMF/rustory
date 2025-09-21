import { logger } from '@main/utils/logger'

import { registerConfigHandlers } from './config.handlers'
import { registerVSVersionHandlers } from './vsVersion.handlers'

export async function registerDBHandlers() {
  logger.info('Registering config db handlers...')
  await registerConfigHandlers()

  logger.info('Registering VS Version db handlers...')
  await registerVSVersionHandlers()
}
