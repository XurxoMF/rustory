import {
  info as logInfo,
  warn as logWarn,
  error as logError,
  debug as logDebug,
  trace as logTrace,
} from "@tauri-apps/plugin-log";

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
