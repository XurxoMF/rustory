/**
 * Error thrown when a VS Instance action fails.
 */
export class RustoryVSInstanceError extends Error {
  public readonly code: RustoryVSInstanceError.Codes

  constructor(message: string, code: RustoryVSInstanceError.Codes) {
    super(message)
    this.name = 'RustoryVSInstanceError'
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RustoryVSInstanceError)
    }
  }
}

export namespace RustoryVSInstanceError {
  export enum Codes {
    /**
     * Generic, not specified.
     */
    VSINSTANCE_ERROR = 'VSINSTANCE_ERROR'
  }
}
