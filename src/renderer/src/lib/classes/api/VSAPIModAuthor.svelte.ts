/**
 * Must have at least the same properties as {@link VSAPIModAuthorType}
 */
export class VSAPIModAuthor {
  private _userid: string

  private _name: string

  public constructor(data: { userid: string; name: string }) {
    this._userid = $state(data.userid)
    this._name = $state(data.name)
  }

  public get userid(): string {
    return this._userid
  }

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
