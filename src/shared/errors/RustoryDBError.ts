/**
 * Error thrown when a db action fails.
 */
export class RustoryDBError extends Error {
  public readonly code: RustoryDBError.Codes

  constructor(message: string, code: RustoryDBError.Codes) {
    super(message)
    this.name = 'RustoryDBError'
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RustoryDBError)
    }
  }
}

export namespace RustoryDBError {
  export enum Codes {
    /**
     * Generic, not specified.
     */
    DB_ERROR = 'DB_ERROR',
    /**
     * Error initiating the DB.
     */
    INIT_ERROR = 'INIT_ERROR',
    /**
     * Error applying migration on the DB.
     */
    MIGRATION_ERROR = 'MIGRATION_ERROR'
  }
}
