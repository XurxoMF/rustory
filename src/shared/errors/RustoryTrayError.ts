/**
 * Error thrown when a tray action fails.
 */
export class RustoryTrayError extends Error {
  public readonly code: RustoryTrayError.Codes

  constructor(message: string, code: RustoryTrayError.Codes) {
    super(message)
    this.name = 'RustoryTrayError'
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RustoryTrayError)
    }
  }
}

export namespace RustoryTrayError {
  export enum Codes {
    /**
     * Generic, not specified.
     */
    TRAY_ERROR = 'TRAY_ERROR'
  }
}
