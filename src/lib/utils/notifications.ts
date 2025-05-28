import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
  type Attachment,
} from "@tauri-apps/plugin-notification";

/**
 * Send a notification to the user using native OS notifications.
 *
 * @param title - The notification title.
 * @param body - The notification body.
 */
export async function notify(
  title: string,
  body: string,
  attachments?: Attachment[]
): Promise<void> {
  let permissionGranted = await isPermissionGranted();

  if (!permissionGranted) {
    const permission = await requestPermission();
    permissionGranted = permission === "granted";
  }

  if (permissionGranted) {
    sendNotification({ title, body, attachments });
  }
}
