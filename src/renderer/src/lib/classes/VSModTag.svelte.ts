/**
 * Must have the same properties as {@link VSModTagType}
 */
export class VSModTag {
  private _tagid: number

  private _name: string

  private _color: string

  constructor(vsModTag: { tagid: number; name: string; color: string }) {
    this._tagid = $state(vsModTag.tagid)
    this._name = $state(vsModTag.name)
    this._color = $state(vsModTag.color)
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

  /**
   * Convert this {@link VSModTag} into a {@link VSModTagType} json
   *
   * @returns The {@link VSModTagType} json
   */
  toJSON(): VSModTagType {
    return {
      tagid: this._tagid,
      name: this._name,
      color: this._color
    }
  }

  /**
   * Converts a {@link VSModTagType} json to a {@link VSModTag}
   *
   * @param json The {@link VSModTagType} to convert
   * @returns The {@link VSModTag}
   */
  static fromJSON(json: VSModTagType): VSModTag {
    return new VSModTag({
      tagid: json.tagid,
      name: json.name,
      color: json.color
    })
  }
}
