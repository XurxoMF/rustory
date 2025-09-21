/**
 * Vintage Story Instance backup.
 *
 * Must have at least the same properties as {@link TVSInstanceBackup}.
 */
export class VSInstanceBackup {
  /**
   * The id of the backup.
   */
  private _id: string

  /**
   * The id of the VS Instance this backup is from.
   */
  private _vsInstanceId: string

  /**
   * The date of the backup.
   */
  private _date: number

  /**
   * The path of the backup.
   */
  private _path: string

  public constructor(data: { id: string; vsInstanceId: string; date: number; path: string }) {
    this._id = data.id
    this._vsInstanceId = data.vsInstanceId
    this._date = data.date
    this._path = data.path
  }

  /**
   * The id of the backup.
   */
  public get id(): string {
    return this._id
  }

  /**
   * The id of the VS Instance this backup is from.
   */
  public get vsInstanceId(): string {
    return this._vsInstanceId
  }

  /**
   * The date of the backup.
   */
  public get date(): number {
    return this._date
  }

  /**
   * The path of the backup.
   */
  public get path(): string {
    return this._path
  }

  /**
   * Convert this {@link VSInstanceBackup} into a {@link TVSInstanceBackup} json.
   * @returns The {@link TVSInstanceBackup} json.
   */
  public toJSON(): TVSInstanceBackup {
    return {
      id: this._id,
      vsInstanceId: this._vsInstanceId,
      date: this._date,
      path: this._path
    }
  }

  /**
   * Converts a {@link TVSInstanceBackup} json to a {@link VSInstanceBackup}.
   * @param json The {@link TVSInstanceBackup} to convert.
   * @returns The {@link VSInstanceBackup}.
   */
  public static fromJSON(json: TVSInstanceBackup): VSInstanceBackup {
    return new VSInstanceBackup({ id: json.id, vsInstanceId: json.vsInstanceId, date: json.date, path: json.path })
  }
}
