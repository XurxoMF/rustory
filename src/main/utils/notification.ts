import { Notification } from 'electron'
import { logger } from './logger'

import icon from '../../../resources/icon.png?asset'

/**
 * Shows a notification to the user.
 *
 * @param title Title of the notification
 * @param body Body of the notification
 */
export function notify(title: string, body: string, onClick: () => void): void {
  try {
    const notification = new Notification({ title, body, icon })
    notification.on('click', () => onClick())
    notification.show()
  } catch (err) {
    logger.error('Error showing notification!')
    logger.debug(`Error showing notification:\n${JSON.stringify(err)}`)
  }
}
