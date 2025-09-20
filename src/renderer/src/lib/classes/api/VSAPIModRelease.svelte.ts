/**
 * Must have at least the same properties as {@link VSAPIModReleaseType}
 */
export class VSAPIModRelease {
  private _releaseid: number

  private _mainfile: string

  private _filename: string

  private _fileid: number

  private _downloads: number

  private _tags: string[]

  private _modidstr: string

  private _modversion: string

  private _created: string

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
    this._releaseid = $state(data.releaseid)
    this._mainfile = $state(data.mainfile)
    this._filename = $state(data.filename)
    this._fileid = $state(data.fileid)
    this._downloads = $state(data.downloads)
    this._tags = $state(data.tags)
    this._modidstr = $state(data.modidstr)
    this._modversion = $state(data.modversion)
    this._created = $state(data.created)
    this._changelog = $state(data.changelog)
  }

  public get releaseid(): number {
    return this._releaseid
  }

  public get mainfile(): string {
    return this._mainfile
  }

  public get filename(): string {
    return this._filename
  }

  public get fileid(): number {
    return this._fileid
  }

  public get downloads(): number {
    return this._downloads
  }

  public get tags(): string[] {
    return this._tags
  }

  public get modidstr(): string {
    return this._modidstr
  }

  public get modversion(): string {
    return this._modversion
  }

  public get created(): string {
    return this._created
  }

  public get changelog(): string {
    return this._changelog
  }

  /**
   * Convert this {@link VSAPIModRelease} into a {@link VSAPIModReleaseType} json
   * @returns The {@link VSAPIModReleaseType} json
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
   * Converts a {@link VSAPIModReleaseType} json to a {@link VSAPIModRelease}
   * @param json The {@link VSAPIModReleaseType} to convert
   * @returns The {@link VSAPIModRelease}
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
