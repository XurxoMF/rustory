export class VSModAuthor {
  private _userid: string

  private _name: string

  constructor(userid: string, name: string) {
    this._userid = $state(userid)
    this._name = $state(name)
  }

  public get userid(): string {
    return this._userid
  }

  public get name(): string {
    return this._name
  }
}
