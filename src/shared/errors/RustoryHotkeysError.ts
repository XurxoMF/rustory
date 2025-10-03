/**
 * Error thrown when a hotkey action fails.
 */
export class RustoryHotkeysError extends Error {
  public readonly code: RustoryHotkeysError.Codes

  constructor(message: string, code: RustoryHotkeysError.Codes) {
    super(message)
    this.name = 'RustoryHotkeysError'
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RustoryHotkeysError)
    }
  }
}

export namespace RustoryHotkeysError {
  export enum Codes {
    /**
     * Generic, not specified.
     */
    HOTKEYS_ERROR = 'HOTKEYS_ERROR',
    /**
     * Instance not initialized.
     */
    NOT_INITIALIZED = 'NOT_INITIALIZED'
  }
}
