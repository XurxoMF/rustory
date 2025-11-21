/**
 * Mod Release queried from ModDB.
 *
 * Must have at least the same properties as {@link VSAPIModReleaseType}.
 */
export class VSAPIModRelease {
  /**
   * The id of the release.
   */
  private _releaseid: number

  /**
   * The main file of the release.
   */
  private _mainfile: string

  /**
   * The filename of the release.
   */
  private _filename: string

  /**
   * The id of the file.
   */
  private _fileid: number

  /**
   * The downloads of the release.
   */
  private _downloads: number

  /**
   * The tags of the release.
   */
  private _tags: string[]

  /**
   * The modidstr of the release.
   */
  private _modidstr: string

  /**
   * The modversion of the release.
   */
  private _modversion: string

  /**
   * The created of the release.
   */
  private _created: string

  /**
   * The changelog of the release.
   */
  private _changelog: string

  public constructor(data: {
    releaseid: number
    mainfile: string
    filename: string
    fileid: number
    downloads: number
    tags: string[]
    modidstr: string
    modversion: string
    created: string
    changelog: string
  }) {
    this._releaseid = data.releaseid
    this._mainfile = data.mainfile
    this._filename = data.filename
    this._fileid = data.fileid
    this._downloads = data.downloads
    this._tags = data.tags
    this._modidstr = data.modidstr
    this._modversion = data.modversion
    this._created = data.created
    this._changelog = data.changelog
  }

  /**
   * The id of the release.
   */
  public get releaseid(): number {
    return this._releaseid
  }

  /**
   * The main file of the release.
   */
  public get mainfile(): string {
    return this._mainfile
  }

  /**
   * The filename of the release.
   */
  public get filename(): string {
    return this._filename
  }

  /**
   * The id of the file.
   */
  public get fileid(): number {
    return this._fileid
  }

  /**
   * The downloads of the release.
   */
  public get downloads(): number {
    return this._downloads
  }

  /**
   * The tags of the release.
   */
  public get tags(): string[] {
    return this._tags
  }

  /**
   * The modidstr of the release.
   */
  public get modidstr(): string {
    return this._modidstr
  }

  /**
   * The modversion of the release.
   */
  public get modversion(): string {
    return this._modversion
  }

  /**
   * The created of the release.
   */
  public get created(): string {
    return this._created
  }

  /**
   * The changelog of the release.
   */
  public get changelog(): string {
    return this._changelog
  }

  /**
   * Convert this {@link VSAPIModRelease} into a {@link VSAPIModReleaseType} json.
   * @returns The {@link VSAPIModReleaseType} json.
   */
  public toJSON(): VSAPIModReleaseType {
    return {
      releaseid: this._releaseid,
      mainfile: this._mainfile,
      filename: this._filename,
      fileid: this._fileid,
      downloads: this._downloads,
      tags: this._tags,
      modidstr: this._modidstr,
      modversion: this._modversion,
      created: this._created,
      changelog: this._changelog
    }
  }

  /**
   * Converts a {@link VSAPIModReleaseType} json to a {@link VSAPIModRelease}.
   * @param json The {@link VSAPIModReleaseType} to convert.
   * @returns The {@link VSAPIModRelease}.
   */
  public static fromJSON(json: VSAPIModReleaseType): VSAPIModRelease {
    return new VSAPIModRelease({
      releaseid: json.releaseid,
      mainfile: json.mainfile,
      filename: json.filename,
      fileid: json.fileid,
      downloads: json.downloads,
      tags: json.tags,
      modidstr: json.modidstr,
      modversion: json.modversion,
      created: json.created,
      changelog: json.changelog
    })
  }
}
