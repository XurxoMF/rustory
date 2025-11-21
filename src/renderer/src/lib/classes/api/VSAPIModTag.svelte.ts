/**
 * Mod Tag queried from the ModDB.
 *
 * Must have at least the same properties as {@link VSAPIModTagType}.
 */
export class VSAPIModTag {
  /**
   * The id of the tag.
   */
  private _tagid: number

  /**
   * The name of the tag.
   */
  private _name: string

  /**
   * The color of the tag.
   */
  private _color: string

  public constructor(data: { tagid: number; name: string; color: string }) {
    this._tagid = data.tagid
    this._name = data.name
    this._color = data.color
  }

  /**
   * The id of the tag.
   */
  public get tagid(): number {
    return this._tagid
  }

  /**
   * The name of the tag.
   */
  public get name(): string {
    return this._name
  }

  /**
   * The color of the tag.
   */
  public get color(): string {
    return this._color
  }

  /**
   * Convert this {@link VSAPIModTag} into a {@link VSAPIModTagType} json.
   * @returns The {@link VSAPIModTagType} json.
   */
  public toJSON(): VSAPIModTagType {
    return {
      tagid: this._tagid,
      name: this._name,
      color: this._color
    }
  }

  /**
   * Converts a {@link VSAPIModTagType} json to a {@link VSAPIModTag}.
   * @param json The {@link VSAPIModTagType} to convert.
   * @returns The {@link VSAPIModTag}.
   */
  public static fromJSON(json: VSAPIModTagType): VSAPIModTag {
    return new VSAPIModTag({
      tagid: json.tagid,
      name: json.name,
      color: json.color
    })
  }
}
