/**
 * Error thrown when a fs action fails.
 */
export class RustoryNotificationError extends Error {
  public readonly code: RustoryNotificationError.Codes

  constructor(message: string, code: RustoryNotificationError.Codes) {
    super(message)
    this.name = 'RustoryNotificationError'
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RustoryNotificationError)
    }
  }
}

export namespace RustoryNotificationError {
  export enum Codes {
    /**
     * Generic, not sopecified.
     */
    NOTIFICATION_ERROR = 'NOTIFICATION_ERROR'
  }
}
