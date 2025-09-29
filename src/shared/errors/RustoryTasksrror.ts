/**
 * Error thrown when a task action fails.
 */
export class RustoryTaskError extends Error {
  public readonly code: RustoryTaskError.Codes

  constructor(message: string, code: RustoryTaskError.Codes) {
    super(message)
    this.name = 'RustoryTaskError'
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RustoryTaskError)
    }
  }
}

export namespace RustoryTaskError {
  export enum Codes {
    /**
     * Generic, not specified.
     */
    TASK_ERROR = 'TASK_ERROR',
    /**
     * Instance not initialized.
     */
    NOT_INITIALIZED = 'NOT_INITIALIZED'
  }
}
