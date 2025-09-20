/**
 * Must have at least the same properties as {@link VSModAuthorType}
 */
export class VSModAuthor {
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
   * Convert this {@link VSModAuthor} into a {@link VSModAuthorType} json
   * @returns The {@link VSModAuthorType} json
   */
  public toJSON(): VSModAuthorType {
    return {
      userid: this._userid,
      name: this._name
    }
  }

  /**
   * Converts a {@link VSModAuthorType} json to a {@link VSModAuthor}
   * @param json The {@link VSModAuthorType} to convert
   * @returns The {@link VSModAuthor}
   */
  public static fromJSON(json: VSModAuthorType): VSModAuthor {
    return new VSModAuthor({
      userid: json.userid,
      name: json.name
    })
  }
}
