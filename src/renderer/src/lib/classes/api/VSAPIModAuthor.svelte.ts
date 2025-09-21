/**
 * Mod Author info queried from the ModDB.
 *
 * Must have at least the same properties as {@link TVSAPIModAuthor}.
 */
export class VSAPIModAuthor {
  /**
   * The id of the author.
   */
  private _userid: string

  /**
   * The name of the author.
   */
  private _name: string

  public constructor(data: { userid: string; name: string }) {
    this._userid = data.userid
    this._name = data.name
  }

  /**
   * The id of the author.
   */
  public get userid(): string {
    return this._userid
  }

  /**
   * The name of the author.
   */
  public get name(): string {
    return this._name
  }

  /**
   * Convert this {@link VSAPIModAuthor} into a {@link TVSAPIModAuthor} json.
   * @returns The {@link TVSAPIModAuthor} json.
   */
  public toJSON(): TVSAPIModAuthor {
    return {
      userid: this._userid,
      name: this._name
    }
  }

  /**
   * Converts a {@link TVSAPIModAuthor} json to a {@link VSAPIModAuthor}.
   * @param json The {@link TVSAPIModAuthor} to convert.
   * @returns The {@link VSAPIModAuthor}.
   */
  public static fromJSON(json: TVSAPIModAuthor): VSAPIModAuthor {
    return new VSAPIModAuthor({
      userid: json.userid,
      name: json.name
    })
  }
}
