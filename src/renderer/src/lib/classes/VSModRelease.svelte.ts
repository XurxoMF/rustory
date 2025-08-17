/**
 * Must have the same properties as {@link VSModReleaseType}
 */
export class VSModRelease {
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

  constructor(vsModRelease: {
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
    this._releaseid = $state(vsModRelease.releaseid)
    this._mainfile = $state(vsModRelease.mainfile)
    this._filename = $state(vsModRelease.filename)
    this._fileid = $state(vsModRelease.fileid)
    this._downloads = $state(vsModRelease.downloads)
    this._tags = $state(vsModRelease.tags)
    this._modidstr = $state(vsModRelease.modidstr)
    this._modversion = $state(vsModRelease.modversion)
    this._created = $state(vsModRelease.created)
    this._changelog = $state(vsModRelease.changelog)
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
   * Convert this {@link VSModRelease} into a {@link VSModReleaseType} json
   * @returns The {@link VSModReleaseType} json
   */
  toJSON(): VSModReleaseType {
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
   * Converts a {@link VSModReleaseType} json to a {@link VSModRelease}
   * @param json The {@link VSModReleaseType} to convert
   * @returns The {@link VSModRelease}
   */
  static fromJSON(json: VSModReleaseType): VSModRelease {
    return new VSModRelease({
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
