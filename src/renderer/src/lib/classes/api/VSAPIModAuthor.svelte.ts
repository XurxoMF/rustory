/**
 * Must have at least the same properties as {@link VSAPIModAuthorType}
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
    this._userid = $state(data.userid)
    this._name = $state(data.name)
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
   * Convert this {@link VSAPIModAuthor} into a {@link VSAPIModAuthorType} json
   * @returns The {@link VSAPIModAuthorType} json
   */
  public toJSON(): VSAPIModAuthorType {
    return {
      userid: this._userid,
      name: this._name
    }
  }

  /**
   * Converts a {@link VSAPIModAuthorType} json to a {@link VSAPIModAuthor}
   * @param json The {@link VSAPIModAuthorType} to convert
   * @returns The {@link VSAPIModAuthor}
   */
  public static fromJSON(json: VSAPIModAuthorType): VSAPIModAuthor {
    return new VSAPIModAuthor({
      userid: json.userid,
      name: json.name
    })
  }
}
