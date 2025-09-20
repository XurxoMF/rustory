/**
 * Must have at least the same properties as {@link VSVersionType}
 */
export class VSVersion {
  private _version: string

  private _path: string

  private _state: VSVersion.State

  public constructor(data: { version: string; path: string }) {
    this._version = data.version
    this._path = data.path
    this._state = $state(VSVersion.State.NOT_INSTALLED)
  }

  public get version(): string {
    return this._version
  }

  public get path(): string {
    return this._path
  }

  public get state(): VSVersion.State {
    return this._state
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
}

export namespace VSVersion {
  export enum State {
    NOT_INSTALLED = 'not_installed',
    INSTALLED = 'installed',
    INSTALLING = 'installing',
    DELETING = 'deleting'
  }
}
