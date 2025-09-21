/**
 * Error thrown when an info action fails.
 */
export class RustoryInfoError extends Error {
  public readonly code: RustoryInfoError.Codes

  constructor(message: string, code: RustoryInfoError.Codes) {
    super(message)
    this.name = 'RustoryInfoError'
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RustoryInfoError)
    }
  }
}

export namespace RustoryInfoError {
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
