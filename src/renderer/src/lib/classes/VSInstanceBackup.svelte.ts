export class VSInstanceBackup {
  private _id: string

  private _date: number

  private _path: string

  constructor(id: string, date: number, path: string) {
    this._id = $state(id)
    this._date = $state(date)
    this._path = $state(path)
  }

  public get id(): string {
    return this._id
  }

  public get date(): number {
    return this._date
  }

  public get path(): string {
    return this._path
  }
}
