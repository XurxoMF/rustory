/**
 * Error thrown when a window action fails.
 */
export class RustoryWindowError extends Error {
  public readonly code: RustoryWindowError.Codes

  constructor(message: string, code: RustoryWindowError.Codes) {
    super(message)
    this.name = 'RustoryWindowError'
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RustoryWindowError)
    }
  }
}

export namespace RustoryWindowError {
  export enum Codes {
    /**
     * Generic, not specified.
     */
    INFO_ERROR = 'INFO_ERROR',
    /**
     * Instance not initialized.
     */
    NOT_INITIALIZED = 'NOT_INITIALIZED'
  }
}
