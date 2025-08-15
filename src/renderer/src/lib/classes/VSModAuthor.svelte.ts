/**
 * Must have the same properties as {@link VSModAuthorType}
 */
export class VSModAuthor {
  private _userid: string

  private _name: string

  constructor(userid: string, name: string) {
    this._userid = $state(userid)
    this._name = $state(name)
  }

  public get userid(): string {
    return this._userid
  }

  public get name(): string {
    return this._name
  }

  /**
   * Convert this {@link VSModAuthor} into a {@link VSModAuthorType} json
   *
   * @returns The {@link VSModAuthorType} json
   */
  toJSON(): VSModAuthorType {
    return {
      userid: this._userid,
      name: this._name
    }
  }

  /**
   * Converts a {@link VSModAuthorType} json to a {@link VSModAuthor}
   *
   * @param json The {@link VSModAuthorType} to convert
   * @returns The {@link VSModAuthor}
   */
  static fromJSON(json: VSModAuthorType): VSModAuthor {
    return new VSModAuthor(json.userid, json.name)
  }
}
