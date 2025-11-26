/**
 * Version queried from the Rustory API.
 *
 * Must have at least the same properties as {@link RAPIVSVersionType}.
 */
export class RAPIVSVersion {
  /**
   * The version string, e.g. "1.15.4".
   */
  private _version: string

  /**
   * The type of the version.
   */
  private _type: RAPIVSVersion.Type

  /**
   * The release date of the version.
   */
  private _releaseDate: number

  /**
   * The import date of the version.
   */
  private _importedDate: number

  /**
   * The download link for Windows.
   */
  private _windows: string

  /**
   * The sha256 checksum for Windows.
   */
  private _windowsSha: string

  /**
   * The download link for Linux.
   */
  private _linux: string

  /**
   * The sha256 checksum for Linux.
   */
  private _linuxSha: string

  /**
   * The download link for macOS.
   */
  private _macos: string

  /**
   * The sha256 checksum for macOS.
   */
  private _macosSha: string

  public constructor(data: {
    version: string
    type: RAPIVSVersion.Type
    releaseDate: number
    importedDate: number
    windows: string
    windowsSha: string
    linux: string
    linuxSha: string
    macos: string
    macosSha: string
  }) {
    this._version = data.version
    this._type = data.type
    this._releaseDate = data.releaseDate
    this._importedDate = data.importedDate
    this._windows = data.windows
    this._windowsSha = data.windowsSha
    this._linux = data.linux
    this._linuxSha = data.linuxSha
    this._macos = data.macos
    this._macosSha = data.macosSha
  }

  /**
   * The version string, e.g. "1.15.4".
   */
  public get version(): string {
    return this._version
  }

  /**
   * The type of the version.
   */
  public get type(): RAPIVSVersion.Type {
    return this._type
  }

  /**
   * The release date of the version.
   */
  public get releaseDate(): number {
    return this._releaseDate
  }

  /**
   * The import date of the version.
   */
  public get importedDate(): number {
    return this._importedDate
  }

  /**
   * The download link for Windows.
   */
  public get windows(): string {
    return this._windows
  }

  /**
   * The sha256 checksum for Windows.
   */
  public get windowsSha(): string {
    return this._windowsSha
  }

  /**
   * The download link for Linux.
   */
  public get linux(): string {
    return this._linux
  }

  /**
   * The sha256 checksum for Linux.
   */
  public get linuxSha(): string {
    return this._linuxSha
  }

  /**
   * The download link for macOS.
   */
  public get macos(): string {
    return this._macos
  }

  /**
   * The sha256 checksum for macOS.
   */
  public get macosSha(): string {
    return this._macosSha
  }

  /**
   * Convert this {@link RAPIVSVersion} into a {@link RAPIVSVersionType} json.
   * @returns The {@link RAPIVSVersionType} json.
   */
  public toJSON(): RAPIVSVersionType {
    return {
      version: this._version,
      type: this._type as RAPIVSVersionTypes,
      releaseDate: this._releaseDate,
      importedDate: this._importedDate,
      windows: this._windows,
      windowsSha: this._windowsSha,
      linux: this._linux,
      linuxSha: this._linuxSha,
      macos: this._macos,
      macosSha: this._macosSha
    }
  }

  /**
   * Converts a {@link RAPIVSVersionType} json to a {@link RAPIVSVersion}.
   * @param json The {@link RAPIVSVersionType} to convert.
   * @returns The {@link RAPIVSVersion}.
   */
  public static fromJSON(json: RAPIVSVersionType): RAPIVSVersion {
    return new RAPIVSVersion({
      version: json.version,
      type: json.type as RAPIVSVersion.Type,
      releaseDate: json.releaseDate,
      importedDate: json.importedDate,
      windows: json.windows,
      windowsSha: json.windowsSha,
      linux: json.linux,
      linuxSha: json.linuxSha,
      macos: json.macos,
      macosSha: json.macosSha
    })
  }
}

export namespace RAPIVSVersion {
  /**
   * Type of the version.
   *
   * Must have at least the same properties as {@link RAPIVSVersionType}.
   */
  export type Type = RAPIVSVersionTypes
}
