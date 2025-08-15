import { Notification } from 'electron'
import { v4 as uuidv4 } from 'uuid'

import icon from '../../../resources/icon.png?asset'

/**
 * Shows a notification to the user.
 *
 * @param title Title of the notification
 * @param body Body of the notification
 * @param onClick Callback to execute when the notification is clicked
 */
export function notify(title: string, body: string, onClick?: (id: string) => void): string {
  const id = uuidv4()

  const notification = new Notification({ title, body, icon })

  notification.on('click', () => {
    if (onClick) onClick(id)
  })

  notification.show()

  return id
}
