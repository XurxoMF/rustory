/**
 * Must have the same properties as {@link VSModScreenshotType}
 */
export class VSModScreenshot {
  private _fileid: number

  private _mainfile: string

  private _filename: string

  private _thumbnailfile: string

  private _createdat: string

  constructor(vsModScreenshot: { fileid: number; mainfile: string; filename: string; thumbnailfile: string; createdat: string }) {
    this._fileid = $state(vsModScreenshot.fileid)
    this._mainfile = $state(vsModScreenshot.mainfile)
    this._filename = $state(vsModScreenshot.filename)
    this._thumbnailfile = $state(vsModScreenshot.thumbnailfile)
    this._createdat = $state(vsModScreenshot.createdat)
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

  /**
   * Convert this {@link VSModScreenshot} into a {@link VSModScreenshotType} json
   *
   * @returns The {@link VSModScreenshotType} json
   */
  toJSON(): VSModScreenshotType {
    return {
      fileid: this._fileid,
      mainfile: this._mainfile,
      filename: this._filename,
      thumbnailfile: this._thumbnailfile,
      createdat: this._createdat
    }
  }

  /**
   * Converts a {@link VSModScreenshotType} json to a {@link VSModScreenshot}
   *
   * @param json The {@link VSModScreenshotType} to convert
   * @returns The {@link VSModScreenshot}
   */
  static fromJSON(json: VSModScreenshotType): VSModScreenshot {
    return new VSModScreenshot({
      fileid: json.fileid,
      mainfile: json.mainfile,
      filename: json.filename,
      thumbnailfile: json.thumbnailfile,
      createdat: json.createdat
    })
  }
}
