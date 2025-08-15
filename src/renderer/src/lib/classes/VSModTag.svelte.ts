/**
 * Must have the same properties as {@link VSModTageType}
 */
export class VSModTag {
  private _tagid: number

  private _name: string

  private _color: string

  constructor(tagid: number, name: string, color: string) {
    this._tagid = $state(tagid)
    this._name = $state(name)
    this._color = $state(color)
  }

  public get tagid(): number {
    return this._tagid
  }
  public get name(): string {
    return this._name
  }
  public get color(): string {
    return this._color
  }
}
