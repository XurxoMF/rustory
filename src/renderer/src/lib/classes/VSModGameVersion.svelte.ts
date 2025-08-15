/**
 * Must have the same properties as {@link VSModGameVersionType}
 */
export class VSModGameVersion {
  private _tagid: string

  private _name: string

  private _color: string

  constructor(tagid: string, name: string, color: string) {
    this._tagid = $state(tagid)
    this._name = $state(name)
    this._color = $state(color)
  }

  public get tagid(): string {
    return this._tagid
  }

  public get name(): string {
    return this._name
  }

  public get color(): string {
    return this._color
  }
}
