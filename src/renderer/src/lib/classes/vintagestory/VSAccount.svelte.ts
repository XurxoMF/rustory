/**
 * Must have at least the same properties as {@link VSAccountType}
 */
export class VSAccount {
  private _id: number

  private _email: string

  private _playerName: string

  private _playerUid: string

  private _playerEntitlements: string

  private _sessionKey: string

  private _sessionSignature: string

  private _mptoken: string | undefined

  private _hostGameServer: boolean

  public constructor(data: VSAccountType) {
    this._id = $state(data.id)
    this._email = $state(data.email)
    this._playerName = $state(data.playerName)
    this._playerUid = $state(data.playerUid)
    this._playerEntitlements = $state(data.playerEntitlements)
    this._sessionKey = $state(data.sessionKey)
    this._sessionSignature = $state(data.sessionSignature)
    this._mptoken = $state(data.mptoken)
    this._hostGameServer = $state(data.hostGameServer)
  }

  public get id(): number {
    return this._id
  }

  public get email(): string {
    return this._email
  }

  public get playerName(): string {
    return this._playerName
  }

  public get playerUid(): string {
    return this._playerUid
  }

  public get playerEntitlements(): string {
    return this._playerEntitlements
  }

  public get sessionKey(): string {
    return this._sessionKey
  }

  public get sessionSignature(): string {
    return this._sessionSignature
  }

  public get mptoken(): string | undefined {
    return this._mptoken
  }

  public get hostGameServer(): boolean {
    return this._hostGameServer
  }

  /**
   * Convert this {@link VSAccount} into a {@link VSAccountType} json
   * @returns The {@link VSAccountType} json
   */
  public toJSON(): VSAccountType {
    return {
      id: this._id,
      email: this._email,
      playerName: this._playerName,
      playerUid: this._playerUid,
      playerEntitlements: this._playerEntitlements,
      sessionKey: this._sessionKey,
      sessionSignature: this._sessionSignature,
      mptoken: this._mptoken,
      hostGameServer: this._hostGameServer
    }
  }

  /**
   * Converts a {@link VSAccountType} json to a {@link VSAccount}
   * @param json The {@link VSAccountType} to convert
   * @returns The {@link VSAccount}
   */
  public static fromJSON(json: VSAccountType): VSAccount {
    return new VSAccount({
      id: json.id,
      email: json.email,
      playerName: json.playerName,
      playerUid: json.playerUid,
      playerEntitlements: json.playerEntitlements,
      sessionKey: json.sessionKey,
      sessionSignature: json.sessionSignature,
      mptoken: json.mptoken,
      hostGameServer: json.hostGameServer
    })
  }
}
