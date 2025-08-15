import { Notification } from 'electron'

/**
 * Shows a notification to the user.
 *
 * @param title Title of the notification
 * @param body Body of the notification
 */
export function notify(title: string, body: string): void {
  new Notification({ title, body }).show()
}
