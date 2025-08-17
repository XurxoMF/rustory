/**
 * Error thrown when a zip action fails.
 */
export class RustoryZipError extends Error {
  public readonly code: RustoryZipError.Codes

  constructor(message: string, code: RustoryZipError.Codes) {
    super(message)
    this.name = 'RustoryZipError'
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RustoryZipError)
    }
  }
}

export namespace RustoryZipError {
  export enum Codes {
    /**
     * Generic, not specified.
     */
    ZIP_ERROR = 'ZIP_ERROR'
  }
}
