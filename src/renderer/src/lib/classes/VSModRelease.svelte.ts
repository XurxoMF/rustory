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

  constructor(releaseid: number, mainfile: string, filename: string, fileid: number, downloads: number, tags: string[], modidstr: string, modversion: string, created: string, changelog: string) {
    this._releaseid = $state(releaseid)
    this._mainfile = $state(mainfile)
    this._filename = $state(filename)
    this._fileid = $state(fileid)
    this._downloads = $state(downloads)
    this._tags = $state(tags)
    this._modidstr = $state(modidstr)
    this._modversion = $state(modversion)
    this._created = $state(created)
    this._changelog = $state(changelog)
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
}
