/**
 * Error thrown when a config action fails.
 */
export class RustoryConfigError extends Error {
  public readonly code: RustoryConfigError.Codes

  constructor(message: string, code: RustoryConfigError.Codes) {
    super(message)
    this.name = 'RustoryConfigError'
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RustoryConfigError)
    }
  }
}

export namespace RustoryConfigError {
  export enum Codes {
    /**
     * Generic, not specified.
     */
    CONFIG_ERROR = 'CONFIG_ERROR'
  }
}
