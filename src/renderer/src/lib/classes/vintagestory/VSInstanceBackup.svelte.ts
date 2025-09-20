/**
 * Must have at least the same properties as {@link VSInstanceBackupType}
 */
export class VSInstanceBackup {
  private _id: number

  private _date: number

  private _path: string

  public constructor(data: { id: number; date: number; path: string }) {
    this._id = $state(data.id)
    this._date = $state(data.date)
    this._path = $state(data.path)
  }

  public get id(): number {
    return this._id
  }

  public get date(): number {
    return this._date
  }

  public get path(): string {
    return this._path
  }

  /**
   * Convert this {@link VSInstanceBackup} into a {@link VSInstanceBackupType} json
   * @returns The {@link VSInstanceBackupType} json
   */
  public toJSON(): VSInstanceBackupType {
    return {
      id: this._id,
      date: this._date,
      path: this._path
    }
  }

  /**
   * Converts a {@link VSInstanceBackupType} json to a {@link VSInstanceBackup}
   * @param json The {@link VSInstanceBackupType} to convert
   * @returns The {@link VSInstanceBackup}
   */
  public static fromJSON(json: VSInstanceBackupType): VSInstanceBackup {
    return new VSInstanceBackup({ id: json.id, date: json.date, path: json.path })
  }
}
