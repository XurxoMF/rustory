/**
 * Error thrown when a data action fails.
 */
export class RustoryDataError extends Error {
  public readonly code: RustoryDataError.Codes

  constructor(message: string, code: RustoryDataError.Codes) {
    super(message)
    this.name = 'RustoryDataError'
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RustoryDataError)
    }
  }
}

export namespace RustoryDataError {
  export enum Codes {
    /**
     * Generic, not specified.
     */
    DATA_ERROR = 'DATA_ERROR',
    /**
     * Instance not initialized.
     */
    NOT_INITIALIZED = 'NOT_INITIALIZED'
  }
}
