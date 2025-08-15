export class VSModScreenshot {
  private _fileid: number

  private _mainfile: string

  private _filename: string

  private _thumbnailfile: string

  private _createdat: string

  constructor(fileid: number, mainfile: string, filename: string, thumbnailfile: string, createdat: string) {
    this._fileid = $state(fileid)
    this._mainfile = $state(mainfile)
    this._filename = $state(filename)
    this._thumbnailfile = $state(thumbnailfile)
    this._createdat = $state(createdat)
  }

  public get fileid(): number {
    return this._fileid
  }
  public get mainfile(): string {
    return this._mainfile
  }
  public get filename(): string {
    return this._filename
  }
  public get thumbnailfile(): string {
    return this._thumbnailfile
  }
  public get createdat(): string {
    return this._createdat
  }
}
