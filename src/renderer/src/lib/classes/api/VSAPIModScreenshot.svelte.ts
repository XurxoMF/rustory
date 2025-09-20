/**
 * Must have at least the same properties as {@link VSAPIModScreenshotType}
 */
export class VSAPIModScreenshot {
  private _fileid: number

  private _mainfile: string

  private _filename: string

  private _thumbnailfile: string

  private _createdat: string

  public constructor(data: { fileid: number; mainfile: string; filename: string; thumbnailfile: string; createdat: string }) {
    this._fileid = $state(data.fileid)
    this._mainfile = $state(data.mainfile)
    this._filename = $state(data.filename)
    this._thumbnailfile = $state(data.thumbnailfile)
    this._createdat = $state(data.createdat)
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
   * Convert this {@link VSAPIModScreenshot} into a {@link VSAPIModScreenshotType} json
   * @returns The {@link VSAPIModScreenshotType} json
   */
  public toJSON(): VSAPIModScreenshotType {
    return {
      fileid: this._fileid,
      mainfile: this._mainfile,
      filename: this._filename,
      thumbnailfile: this._thumbnailfile,
      createdat: this._createdat
    }
  }

  /**
   * Converts a {@link VSAPIModScreenshotType} json to a {@link VSAPIModScreenshot}
   * @param json The {@link VSAPIModScreenshotType} to convert
   * @returns The {@link VSAPIModScreenshot}
   */
  public static fromJSON(json: VSAPIModScreenshotType): VSAPIModScreenshot {
    return new VSAPIModScreenshot({
      fileid: json.fileid,
      mainfile: json.mainfile,
      filename: json.filename,
      thumbnailfile: json.thumbnailfile,
      createdat: json.createdat
    })
  }
}
