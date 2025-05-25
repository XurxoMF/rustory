import {
  info as logInfo,
  warn as logWarn,
  error as logError,
  debug as logDebug,
  trace as logTrace,
} from "@tauri-apps/plugin-log";

import { RustoryWindow } from "./RustoryWindow.svelte";
import { RustoryInfo } from "./RustoryInfo.svelte";
import { RustoryConfig } from "./RustoryConfig.svelte";
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
  type Attachment,
} from "@tauri-apps/plugin-notification";

export class Rustory {
  /**
   * Info about Rustory.
   */
  info: RustoryInfo;

  /**
   * Rustory configuration.
   */
  config: RustoryConfig;

  /**
   * Main Rustory window.
   */
  mainWindow: RustoryWindow;

  /**
   * Creates a new instance of Rustory.
   *
   * Data is not loaded! Execute the .init() method of each property to load the data.
   */
  constructor() {
    this.info = new RustoryInfo();
    this.config = new RustoryConfig();
    this.mainWindow = new RustoryWindow();
  }

  /**
   * Logs a message to the console and log file.
   *
   * @param type - Log level.
   * @param message - Message to log.
   */
  log(type: "info" | "warn" | "error" | "debug" | "trace", message: string): void {
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
   * Send a notification to the user using native OS notifications.
   *
   * @param title - The notification title.
   * @param body - The notification body.
   */
  async notify(title: string, body: string, attachments?: Attachment[]): Promise<void> {
    let permissionGranted = await isPermissionGranted();

    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === "granted";
    }

    if (permissionGranted) {
      sendNotification({ title, body, attachments });
    }
  }
}
