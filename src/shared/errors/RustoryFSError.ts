/**
 * Error thrown when a fs action fails.
 */
export class RustoryFSError extends Error {
  public readonly code: RustoryFSError.Codes

  constructor(message: string, code: RustoryFSError.Codes) {
    super(message)
    this.name = 'RustoryFSError'
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RustoryFSError)
    }
  }
}

export namespace RustoryFSError {
  export enum Codes {
    /**
     * Generic, not sopecified.
     */
    FS_ERROR = 'FS_ERROR'
  }
}
