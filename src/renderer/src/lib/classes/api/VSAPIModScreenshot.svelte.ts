/**
 * Mod Screenshot queried from the ModDB.
 *
 * Must have at least the same properties as {@link VSAPIModScreenshotType}.
 */
export class VSAPIModScreenshot {
  /**
   * The id of the screenshot.
   */
  private _fileid: number

  /**
   * The main file of the screenshot.
   */
  private _mainfile: string

  /**
   * The filename of the screenshot.
   */
  private _filename: string

  /**
   * The thumbnail file of the screenshot.
   */
  private _thumbnailfile: string

  /**
   * The creation date of the screenshot.
   */
  private _createdat: string

  public constructor(data: { fileid: number; mainfile: string; filename: string; thumbnailfile: string; createdat: string }) {
    this._fileid = data.fileid
    this._mainfile = data.mainfile
    this._filename = data.filename
    this._thumbnailfile = data.thumbnailfile
    this._createdat = data.createdat
  }

  /**
   * The id of the screenshot.
   */
  public get fileid(): number {
    return this._fileid
  }

  /**
   * The main file of the screenshot.
   */
  public get mainfile(): string {
    return this._mainfile
  }

  /**
   * The filename of the screenshot.
   */
  public get filename(): string {
    return this._filename
  }

  /**
   * The thumbnail file of the screenshot.
   */
  public get thumbnailfile(): string {
    return this._thumbnailfile
  }

  /**
   * The creation date of the screenshot.
   */
  public get createdat(): string {
    return this._createdat
  }

  /**
   * Convert this {@link VSAPIModScreenshot} into a {@link VSAPIModScreenshotType} json.
   * @returns The {@link VSAPIModScreenshotType} json.
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
   * Converts a {@link VSAPIModScreenshotType} json to a {@link VSAPIModScreenshot}.
   * @param json The {@link VSAPIModScreenshotType} to convert.
   * @returns The {@link VSAPIModScreenshot}.
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
