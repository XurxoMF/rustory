/**
 * Must have at least the same properties as {@link RAPIVSVersionType}
 */
export class RAPIVSVersion {
  private _version: string

  private _type: RAPIVSVersionTypeType

  private _releaseDate: number

  private _importedDate: number

  private _windows: string

  private _windowsSha: string

  private _linux: string

  private _linuxSha: string

  private _mac: string

  private _macSha: string

  public constructor(data: {
    version: string
    type: RAPIVSVersionTypeType
    releaseDate: number
    importedDate: number
    windows: string
    windowsSha: string
    linux: string
    linuxSha: string
    mac: string
    macSha: string
  }) {
    this._version = data.version
    this._type = data.type
    this._releaseDate = data.releaseDate
    this._importedDate = data.importedDate
    this._windows = data.windows
    this._windowsSha = data.windowsSha
    this._linux = data.linux
    this._linuxSha = data.linuxSha
    this._mac = data.mac
    this._macSha = data.macSha
  }

  public get version(): string {
    return this._version
  }

  public get type(): RAPIVSVersionTypeType {
    return this._type
  }

  public get releaseDate(): number {
    return this._releaseDate
  }

  public get importedDate(): number {
    return this._importedDate
  }

  public get windows(): string {
    return this._windows
  }

  public get windowsSha(): string {
    return this._windowsSha
  }

  public get linux(): string {
    return this._linux
  }

  public get linuxSha(): string {
    return this._linuxSha
  }

  public get mac(): string {
    return this._mac
  }

  public get macSha(): string {
    return this._macSha
  }

  /**
   * Convert this {@link RAPIVSVersion} into a {@link RAPIVSVersionType} json
   * @returns The {@link RAPIVSVersionType} json
   */
  public toJSON(): RAPIVSVersionType {
    return {
      version: this._version,
      type: this._type,
      releaseDate: this._releaseDate,
      importedDate: this._importedDate,
      windows: this._windows,
      windowsSha: this._windowsSha,
      linux: this._linux,
      linuxSha: this._linuxSha,
      mac: this._mac,
      macSha: this._macSha
    }
  }

  /**
   * Converts a {@link RAPIVSVersionType} json to a {@link RAPIVSVersion}
   * @param json The {@link RAPIVSVersionType} to convert
   * @returns The {@link RAPIVSVersion}
   */
  public static fromJSON(json: RAPIVSVersionType): RAPIVSVersion {
    return new RAPIVSVersion({
      version: json.version,
      type: json.type,
      releaseDate: json.releaseDate,
      importedDate: json.importedDate,
      windows: json.windows,
      windowsSha: json.windowsSha,
      linux: json.linux,
      linuxSha: json.linuxSha,
      mac: json.mac,
      macSha: json.macSha
    })
  }
}
