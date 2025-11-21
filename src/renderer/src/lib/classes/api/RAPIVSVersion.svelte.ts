import { RustoryVSVersionError } from '@shared/errors/RustoryVSVersionError'
import { Config } from '@renderer/lib/classes/Config.svelte'
import { Info } from '@renderer/lib/classes/Info.svelte'
import { VSVersion } from '@renderer/lib/classes/vintagestory/VSVersion.svelte'
import { Data } from '@renderer/lib/classes/Data.svelte'
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
  private _mac: string

  /**
   * The sha256 checksum for macOS.
   */
  private _macSha: string

  public constructor(data: {
    version: string
    type: RAPIVSVersion.Type
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
  public get mac(): string {
    return this._mac
  }

  /**
   * The sha256 checksum for macOS.
   */
  public get macSha(): string {
    return this._macSha
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
      mac: this._mac,
      macSha: this._macSha
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
      mac: json.mac,
      macSha: json.macSha
    })
  }

  /**
   * Add the VS Version and install it.
   * @throws A {@link RustoryVSVersionError} error.
   */
  public async addAndInstall(path?: string | undefined): Promise<void> {
    window.api.logger.info(`Adding VS Version ${this._version}...`)

    const installPath = path ?? (await window.api.fs.join(Config.instance.vsVersionsPath, this._version))

    const vsVersion = new VSVersion({ version: this._version, path: installPath, state: VSVersion.State.NOT_INSTALLED })

    Data.instance.vsVersions.push(vsVersion)

    let url: string

    switch (Info.instance.os.platform) {
      case 'linux':
        url = this._linux
        break
      case 'darwin':
        url = this._mac
        break
      case 'Windows':
        url = this._windows
        break
      default:
        window.api.logger.error(`Unsupported OS! ${Info.instance.os.platform}`)
        throw new RustoryVSVersionError(`Unsupported OS: ${Info.instance.os.platform}`, RustoryVSVersionError.Codes.UNSUPORTED_OS)
    }

    await vsVersion.install(url)
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
