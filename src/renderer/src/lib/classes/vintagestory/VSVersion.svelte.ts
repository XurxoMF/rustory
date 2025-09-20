import { RustoryVSVersionError } from '@shared/errors/RustoryVSVersionError'

/**
 * Must have at least the same properties as {@link VSVersionType}
 */
export class VSVersion {
  /**
   * The version string, e.g. "1.15.4".
   */
  private _version: string

  /**
   * The path to the version, e.g. "/path/to/vintagestory/versions/1.15.4".
   */
  private _path: string

  /**
   * The state of the version.
   */
  private _state: VSVersion.State

  public constructor(data: { version: string; path: string }) {
    this._version = data.version
    this._path = data.path
    this._state = $state(VSVersion.State.NOT_INSTALLED)
  }

  /**
   * The version string, e.g. "1.15.4".
   */
  public get version(): string {
    return this._version
  }

  /**
   * The path to the version, e.g. "/path/to/vintagestory/versions/1.15.4".
   */
  public get path(): string {
    return this._path
  }

  /**
   * The state of the version.
   */
  public get state(): VSVersion.State {
    return this._state
  }

  /**
   * The state of the version.
   */
  public set state(state: VSVersion.State) {
    this._state = state
  }

  /**
   * Convert this {@link VSVersion} into a {@link VSVersionType} json
   * @returns The {@link VSVersionType} json
   */
  public toJSON(): VSVersionType {
    return {
      version: this._version,
      path: this._path
    }
  }

  /**
   * Converts a {@link VSVersionType} json to a {@link VSVersion}
   * @param json The {@link VSVersionType} to convert
   * @returns The {@link VSVersion}
   */
  public static fromJSON(json: VSVersionType): VSVersion {
    return new VSVersion({
      version: json.version,
      path: json.path
    })
  }

  /**
   * Delete this version from the DB.
   * @throws {RustoryVSVersionError} When there is an error deleting the version from the DB.
   */
  public async delete(): Promise<void> {
    try {
      await window.api.db.vsVersion.deleteVSVersion(this.toJSON())
    } catch (err) {
      window.api.logger.error('There was an error deleting the vs version to the DB!')
      window.api.logger.error(`There was an error deleting the vs version to the DB:\n${JSON.stringify(err)}`)
      throw new RustoryVSVersionError(`There was an error deleting the vs version to the DB:\n${JSON.stringify(err)}`, RustoryVSVersionError.Codes.VSVERSION_ERROR)
    }
  }

  /**
   * Save this version to the DB.
   * @throws {RustoryVSVersionError} When there is an error saving the version to the DB.
   */
  public async save(): Promise<void> {
    try {
      await window.api.db.vsVersion.saveVSVersion(this.toJSON())
    } catch (err) {
      window.api.logger.error('There was an error saving the vs version to the DB!')
      window.api.logger.error(`There was an error saving the vs version to the DB:\n${JSON.stringify(err)}`)
      throw new RustoryVSVersionError(`There was an error saving the vs version to the DB:\n${JSON.stringify(err)}`, RustoryVSVersionError.Codes.VSVERSION_ERROR)
    }
  }

  /**
   * Get all the vs versions from the DB.
   * @returns All the vs versions from the DB.
   * @throws {RustoryVSVersionError} When there is an error getting the vs versions.
   */
  public static async getAllFromDB(): Promise<VSVersion[]> {
    try {
      const versions = await window.api.db.vsVersion.getVSVersions()

      return versions.map((v) => VSVersion.fromJSON(v))
    } catch (err) {
      window.api.logger.error('There was an error getting the vs versions!')
      window.api.logger.error(`There was an error getting the vs versions:\n${JSON.stringify(err)}`)
      throw new RustoryVSVersionError(`There was an error getting the vs versions:\n${JSON.stringify(err)}`, RustoryVSVersionError.Codes.VSVERSION_ERROR)
    }
  }
}

export namespace VSVersion {
  export enum State {
    NOT_INSTALLED = 'not_installed',
    INSTALLED = 'installed',
    INSTALLING = 'installing',
    DELETING = 'deleting'
  }
}
