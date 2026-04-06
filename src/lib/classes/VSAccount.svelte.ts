/**
 * Vintage Story user account.
 */
export class VSAccount {
	/**
	 * The id of the account.
	 */
	private _id: number;

	/**
	 * The email of the account.
	 */
	private _email: string;

	/**
	 * The name of the player.
	 */
	private _playerName: string;

	/**
	 * The uid of the player.
	 */
	private _playerUid: string;

	/**
	 * The entitlements of the player.
	 */
	private _playerEntitlements: string;

	/**
	 * The session key of the account.
	 */
	private _sessionKey: string;

	/**
	 * The session signature of the account.
	 */
	private _sessionSignature: string;

	/**
	 * The mptoken of the account.
	 */
	private _mptoken?: string | undefined;

	/**
	 * Whether the account is hosting a game server.
	 */
	private _hostGameServer: boolean;

	public constructor(vsAccound: {
		id: number;
		email: string;
		playerName: string;
		playerUid: string;
		playerEntitlements: string;
		sessionKey: string;
		sessionSignature: string;
		mptoken?: string | undefined;
		hostGameServer: boolean;
	}) {
		this._id = vsAccound.id;
		this._email = vsAccound.email;
		this._playerName = vsAccound.playerName;
		this._playerUid = vsAccound.playerUid;
		this._playerEntitlements = vsAccound.playerEntitlements;
		this._sessionKey = vsAccound.sessionKey;
		this._sessionSignature = vsAccound.sessionSignature;
		this._mptoken = vsAccound.mptoken;
		this._hostGameServer = vsAccound.hostGameServer;
	}

	/**
	 * The id of the account.
	 */
	public get id(): number {
		return this._id;
	}

	/**
	 * The email of the account.
	 */
	public get email(): string {
		return this._email;
	}

	/**
	 * The name of the player.
	 */
	public get playerName(): string {
		return this._playerName;
	}

	/**
	 * The uid of the player.
	 */
	public get playerUid(): string {
		return this._playerUid;
	}

	/**
	 * The entitlements of the player.
	 */
	public get playerEntitlements(): string {
		return this._playerEntitlements;
	}

	/**
	 * The session key of the account.
	 */
	public get sessionKey(): string {
		return this._sessionKey;
	}

	/**
	 * The session signature of the account.
	 */
	public get sessionSignature(): string {
		return this._sessionSignature;
	}

	/**
	 * The mptoken of the account.
	 */
	public get mptoken(): string | undefined {
		return this._mptoken;
	}

	/**
	 * Whether the account is hosting a game server.
	 */
	public get hostGameServer(): boolean {
		return this._hostGameServer;
	}
}
