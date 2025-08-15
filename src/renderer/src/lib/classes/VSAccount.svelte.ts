/**
 * Must have the same properties as {@link VSAccountType}
 */
export class VSAccount {
  private _email: string

  private _playerName: string

  private _playerUid: string

  private _playerEntitlements: string

  private _sessionKey: string

  private _sessionSignature: string

  private _mptoken: string | null

  private _hostGameServer: boolean

  constructor(email: string, playerName: string, playerUid: string, playerEntitlements: string, sessionKey: string, sessionSignature: string, mptoken: string, hostGameServer: boolean) {
    this._email = $state(email)
    this._playerName = $state(playerName)
    this._playerUid = $state(playerUid)
    this._playerEntitlements = $state(playerEntitlements)
    this._sessionKey = $state(sessionKey)
    this._sessionSignature = $state(sessionSignature)
    this._mptoken = $state(mptoken)
    this._hostGameServer = $state(hostGameServer)
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

  get mptoken(): string | null {
    return this._mptoken
  }

  get hostGameServer(): boolean {
    return this._hostGameServer
  }
}
