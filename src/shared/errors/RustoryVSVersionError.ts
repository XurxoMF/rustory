/**
 * Error thrown when a vs version action fails.
 */
export class RustoryVSVersionError extends Error {
  public readonly code: RustoryVSVersionError.Codes

  constructor(message: string, code: RustoryVSVersionError.Codes) {
    super(message)
    this.name = 'RustoryVSVersionError'
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RustoryVSVersionError)
    }
  }
}

export namespace RustoryVSVersionError {
  export enum Codes {
    /**
     * Generic, not specified.
     */
    VSVERSION_ERROR = 'VSVERSION_ERROR'
  }
}
