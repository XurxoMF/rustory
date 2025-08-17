import { Notification } from 'electron'

import { logger } from '@main/utils/logger'

import icon from '../../../resources/icon.png?asset'
import { RustoryNotificationError } from '@shared/errors/RustoryNotificationError'

/**
 * Shows a notification to the user.
 * @param title Title of the notification.
 * @param body Body of the notification.
 * @param onClick Callback to execute when the notification is clicked.
 * @returns The id of the notification.
 * @throws A {@link RustoryNotificationError} error.
 */
export function notify(title: string, body: string, onClick?: (id: string) => void): string {
  try {
    const id = crypto.randomUUID()

    const notification = new Notification({ title, body, icon })

    notification.on('click', () => {
      if (onClick) onClick(id)
    })

    notification.show()

    return id
  } catch (err) {
    logger.error('Error sending a notification!')
    logger.debug(`Error sending a notification:\n${JSON.stringify(err)}`)
    throw new RustoryNotificationError('Error sending a notification!', RustoryNotificationError.Codes.NOTIFICATION_ERROR)
  }
}
