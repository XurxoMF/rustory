import {
  info as logInfo,
  warn as logWarn,
  error as logError,
  debug as logDebug,
  trace as logTrace,
} from "@tauri-apps/plugin-log";

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

/**
 * Logs a message to the console and log file.
 *
 * @param type - Log level.
 * @param message - Message to log.
 */
export function log(type: "info" | "warn" | "error" | "debug" | "trace", message: string): void {
  switch (type) {
    case "info":
      logInfo(message);
      break;
    case "warn":
      logWarn(message);
      break;
    case "error":
      logError(message);
      break;
    case "debug":
      logDebug(message);
      break;
    case "trace":
      logTrace(message);
      break;
    default:
      logInfo(message);
  }
}

/**
 * Sleeps the app for the amount of ms passed.
 *
 * Use it with await sleep(x).
 *
 * @param ms - Miliseconds to sleep.
 * @returns - A new Promise that resolvers after the ms time.
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
