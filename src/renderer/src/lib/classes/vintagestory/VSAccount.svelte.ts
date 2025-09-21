/**
 * Vintage Story user account.
 *
 * Must have at least the same properties as {@link TVSAccount}.
 */
export class VSAccount {
  /**
   * The id of the account.
   */
  private _id: number

  /**
   * The email of the account.
   */
  private _email: string

  /**
   * The name of the player.
   */
  private _playerName: string

  /**
   * The uid of the player.
   */
  private _playerUid: string

  /**
   * The entitlements of the player.
   */
  private _playerEntitlements: string

  /**
   * The session key of the account.
   */
  private _sessionKey: string

  /**
   * The session signature of the account.
   */
  private _sessionSignature: string

  /**
   * The mptoken of the account.
   */
  private _mptoken: string | undefined

  /**
   * Whether the account is hosting a game server.
   */
  private _hostGameServer: boolean

  public constructor(data: TVSAccount) {
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

  /**
   * The id of the account.
   */
  public get id(): number {
    return this._id
  }

  /**
   * The email of the account.
   */
  public get email(): string {
    return this._email
  }

  /**
   * The name of the player.
   */
  public get playerName(): string {
    return this._playerName
  }

  /**
   * The uid of the player.
   */
  public get playerUid(): string {
    return this._playerUid
  }

  /**
   * The entitlements of the player.
   */
  public get playerEntitlements(): string {
    return this._playerEntitlements
  }

  /**
   * The session key of the account.
   */
  public get sessionKey(): string {
    return this._sessionKey
  }

  /**
   * The session signature of the account.
   */
  public get sessionSignature(): string {
    return this._sessionSignature
  }

  /**
   * The mptoken of the account.
   */
  public get mptoken(): string | undefined {
    return this._mptoken
  }

  /**
   * Whether the account is hosting a game server.
   */
  public get hostGameServer(): boolean {
    return this._hostGameServer
  }

  /**
   * Convert this {@link VSAccount} into a {@link TVSAccount} json.
   * @returns The {@link TVSAccount} json.
   */
  public toJSON(): TVSAccount {
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
   * Converts a {@link TVSAccount} json to a {@link VSAccount}.
   * @param json The {@link TVSAccount} to convert.
   * @returns The {@link VSAccount}.
   */
  public static fromJSON(json: TVSAccount): VSAccount {
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
