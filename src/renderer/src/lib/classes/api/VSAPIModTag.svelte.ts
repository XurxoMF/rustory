/**
 * Mod Tag queried from the ModDB.
 *
 * Must have at least the same properties as {@link TVSAPIModTag}.
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
   * Convert this {@link VSAPIModTag} into a {@link TVSAPIModTag} json.
   * @returns The {@link TVSAPIModTag} json.
   */
  public toJSON(): TVSAPIModTag {
    return {
      tagid: this._tagid,
      name: this._name,
      color: this._color
    }
  }

  /**
   * Converts a {@link TVSAPIModTag} json to a {@link VSAPIModTag}.
   * @param json The {@link TVSAPIModTag} to convert.
   * @returns The {@link VSAPIModTag}.
   */
  public static fromJSON(json: TVSAPIModTag): VSAPIModTag {
    return new VSAPIModTag({
      tagid: json.tagid,
      name: json.name,
      color: json.color
    })
  }
}
