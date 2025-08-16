/**
 * Must have the same properties as {@link VSModGameVersionType}
 */
export class VSModGameVersion {
  private _tagid: string

  private _name: string

  private _color: string

  constructor(vsModGameVersion: { tagid: string; name: string; color: string }) {
    this._tagid = $state(vsModGameVersion.tagid)
    this._name = $state(vsModGameVersion.name)
    this._color = $state(vsModGameVersion.color)
  }

  public get tagid(): string {
    return this._tagid
  }

  public get name(): string {
    return this._name
  }

  public get color(): string {
    return this._color
  }

  /**
   * Convert this {@link VSModGameVersion} into a {@link VSModGameVersionType} json
   *
   * @returns The {@link VSModGameVersionType} json
   */
  toJSON(): VSModGameVersionType {
    return {
      tagid: this._tagid,
      name: this._name,
      color: this._color
    }
  }

  /**
   * Converts a {@link VSModGameVersionType} json to a {@link VSModGameVersion}
   *
   * @param json The {@link VSModGameVersionType} to convert
   * @returns The {@link VSModGameVersion}
   */
  static fromJSON(json: VSModGameVersionType): VSModGameVersion {
    return new VSModGameVersion({
      tagid: json.tagid,
      name: json.name,
      color: json.color
    })
  }
}
