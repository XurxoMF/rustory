/**
 * Must have the same properties as {@link VSVersionType}
 */
export class VSVersion {
  private _version: string

  private _path: string

  constructor(vsVersion: { version: string; path: string }) {
    this._version = $state(vsVersion.version)
    this._path = $state(vsVersion.path)
  }

  public get version(): string {
    return this._version
  }

  public get path(): string {
    return this._path
  }

  /**
   * Convert this {@link VSVersion} into a {@link VSVersionType} json
   * @returns The {@link VSVersionType} json
   */
  toJSON(): VSVersionType {
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
  static fromJSON(json: VSVersionType): VSVersion {
    return new VSVersion({
      version: json.version,
      path: json.path
    })
  }
}
