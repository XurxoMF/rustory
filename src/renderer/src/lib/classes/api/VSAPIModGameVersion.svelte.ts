/**
 * Mod Game Version queried from the ModDB.
 *
 * Must have at least the same properties as {@link TVSAPIModGameVersion}.
 */
export class VSAPIModGameVersion {
  /**
   * The id of the game version.
   */
  private _tagid: string

  /**
   * The name of the game version.
   */
  private _name: string

  /**
   * The color of the game version.
   */
  private _color: string

  public constructor(data: { tagid: string; name: string; color: string }) {
    this._tagid = data.tagid
    this._name = data.name
    this._color = data.color
  }

  /**
   * The id of the game version.
   */
  public get tagid(): string {
    return this._tagid
  }

  /**
   * The name of the game version.
   */
  public get name(): string {
    return this._name
  }

  /**
   * The color of the game version.
   */
  public get color(): string {
    return this._color
  }

  /**
   * Convert this {@link VSAPIModGameVersion} into a {@link TVSAPIModGameVersion} json.
   * @returns The {@link TVSAPIModGameVersion} json.
   */
  public toJSON(): TVSAPIModGameVersion {
    return {
      tagid: this._tagid,
      name: this._name,
      color: this._color
    }
  }

  /**
   * Converts a {@link TVSAPIModGameVersion} json to a {@link VSAPIModGameVersion}.
   * @param json The {@link TVSAPIModGameVersion} to convert.
   * @returns The {@link VSAPIModGameVersion}.
   */
  public static fromJSON(json: TVSAPIModGameVersion): VSAPIModGameVersion {
    return new VSAPIModGameVersion({
      tagid: json.tagid,
      name: json.name,
      color: json.color
    })
  }
}
