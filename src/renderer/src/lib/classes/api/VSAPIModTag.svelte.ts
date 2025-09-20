/**
 * Must have at least the same properties as {@link VSAPIModTagType}
 */
export class VSAPIModTag {
  private _tagid: number

  private _name: string

  private _color: string

  public constructor(data: { tagid: number; name: string; color: string }) {
    this._tagid = $state(data.tagid)
    this._name = $state(data.name)
    this._color = $state(data.color)
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
   * Convert this {@link VSAPIModTag} into a {@link VSAPIModTagType} json
   * @returns The {@link VSAPIModTagType} json
   */
  public toJSON(): VSAPIModTagType {
    return {
      tagid: this._tagid,
      name: this._name,
      color: this._color
    }
  }

  /**
   * Converts a {@link VSAPIModTagType} json to a {@link VSAPIModTag}
   * @param json The {@link VSAPIModTagType} to convert
   * @returns The {@link VSAPIModTag}
   */
  public static fromJSON(json: VSAPIModTagType): VSAPIModTag {
    return new VSAPIModTag({
      tagid: json.tagid,
      name: json.name,
      color: json.color
    })
  }
}
