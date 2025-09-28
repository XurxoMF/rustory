import { Notification } from 'electron'

import { logger } from '@main/utils/logger'

import icon from '../../../resources/icon.png?asset'
import { RustoryNotificationError } from '@shared/errors/RustoryNotificationError'

/**
 * Shows a notification to the user.
 * @param title Title of the notification.
 * @param body Body of the notification.
 * @param onclick Callback to execute when the notification is clicked.
 * @returns The id of the notification.
 * @throws A {@link RustoryNotificationError} error.
 */
export function notify(id: string, title: string, body: string, onclick: (id: string) => void | undefined): void {
  try {
    const notification = new Notification({ title, body, icon })

    notification.on('click', () => {
      if (onclick) onclick(id)
    })

    notification.show()
  } catch (err) {
    logger.error('Error sending a notification!')
    logger.debug(`Error sending a notification:\n${JSON.stringify(err)}`)
    throw new RustoryNotificationError('Error sending a notification!', RustoryNotificationError.Codes.NOTIFICATION_ERROR)
  }
}
