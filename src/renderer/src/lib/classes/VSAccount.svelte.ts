/**
 * Must have the same properties as {@link VSAccountType}
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

  constructor(vsAccount: VSAccountType) {
    this._id = $state(vsAccount.id)
    this._email = $state(vsAccount.email)
    this._playerName = $state(vsAccount.playerName)
    this._playerUid = $state(vsAccount.playerUid)
    this._playerEntitlements = $state(vsAccount.playerEntitlements)
    this._sessionKey = $state(vsAccount.sessionKey)
    this._sessionSignature = $state(vsAccount.sessionSignature)
    this._mptoken = $state(vsAccount.mptoken)
    this._hostGameServer = $state(vsAccount.hostGameServer)
  }

  get id(): number {
    return this._id
  }

  get email(): string {
    return this._email
  }

  get playerName(): string {
    return this._playerName
  }

  get playerUid(): string {
    return this._playerUid
  }

  get playerEntitlements(): string {
    return this._playerEntitlements
  }

  get sessionKey(): string {
    return this._sessionKey
  }

  get sessionSignature(): string {
    return this._sessionSignature
  }

  get mptoken(): string | undefined {
    return this._mptoken
  }

  get hostGameServer(): boolean {
    return this._hostGameServer
  }

  /**
   * Convert this {@link VSAccount} into a {@link VSAccountType} json
   * @returns The {@link VSAccountType} json
   */
  toJSON(): VSAccountType {
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
  static fromJSON(json: VSAccountType): VSAccount {
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
