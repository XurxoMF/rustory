/**
 * Error thrown when a shell action fails.
 */
export class RustoryShellError extends Error {
  public readonly code: RustoryShellError.Codes

  constructor(message: string, code: RustoryShellError.Codes) {
    super(message)
    this.name = 'RustoryShellError'
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RustoryShellError)
    }
  }
}

export namespace RustoryShellError {
  export enum Codes {
    /**
     * Generic, not specified.
     */
    SHELL_ERROR = 'SHELL_ERROR'
  }
}
