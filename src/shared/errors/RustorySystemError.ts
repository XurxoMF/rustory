/**
 * Error thrown when a system action fails.
 */
export class RustorySystemError extends Error {
  public readonly code: RustorySystemError.Codes

  constructor(message: string, code: RustorySystemError.Codes) {
    super(message)
    this.name = 'RustorySystemError'
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RustorySystemError)
    }
  }
}

export namespace RustorySystemError {
  export enum Codes {
    /**
     * Generic, not specified.
     */
    SYSTEM_ERROR = 'SYSTEM_ERROR'
  }
}
