/**
 * Error thrown when a net action fails.
 */
export class RustoryNetError extends Error {
  public readonly code: RustoryNetError.Codes

  constructor(message: string, code: RustoryNetError.Codes) {
    super(message)
    this.name = 'RustoryNetError'
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RustoryNetError)
    }
  }
}

export namespace RustoryNetError {
  export enum Codes {
    /**
     * Generic, not sopecified.
     */
    NET_ERROR = 'NET_ERROR'
  }
}
