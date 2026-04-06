/**
 * Mod queried from the ModDB.
 * This is the simplified mod from /api/mods.
 */
export class VSAPIModOnList {
	/**
	 * The id of the mod.
	 */
	private _modid: number;

	/**
	 * The assetid of the mod.
	 */
	private _assetid: number;

	/**
	 * The downloads of the mod.
	 */
	private _downloads: number;

	/**
	 * The follows of the mod.
	 */
	private _follows: number;

	/**
	 * The trendingpoints of the mod.
	 */
	private _trendingpoints: number;

	/**
	 * The comments of the mod.
	 */
	private _comments: number;

	/**
	 * The name of the mod.
	 */
	private _name: string;

	/**
	 * The summary of the mod.
	 */
	private _summary?: string | undefined;

	/**
	 * The modidstrs of the mod.
	 */
	private _modidstrs: string[];

	/**
	 * The author of the mod.
	 */
	private _author: string;

	/**
	 * The urlalias of the mod.
	 */
	private _urlalias?: string | undefined;

	/**
	 * The side of the mod.
	 */
	private _side: string;

	/**
	 * The type of the mod.
	 */
	private _type: string;

	/**
	 * The logo of the mod.
	 */
	private _logo: string;

	/**
	 * The tags of the mod.
	 */
	private _tags: string[];

	/**
	 * The lastreleased of the mod.
	 */
	private _lastreleased: string;

	public constructor(vsApiModOnList: {
		modid: number;
		assetid: number;
		downloads: number;
		follows: number;
		trendingpoints: number;
		comments: number;
		name: string;
		summary?: string | undefined;
		modidstrs: string[];
		author: string;
		urlalias?: string | undefined;
		side: string;
		type: string;
		logo: string;
		tags: string[];
		lastreleased: string;
	}) {
		this._modid = vsApiModOnList.modid;
		this._assetid = vsApiModOnList.assetid;
		this._downloads = vsApiModOnList.downloads;
		this._follows = vsApiModOnList.follows;
		this._trendingpoints = vsApiModOnList.trendingpoints;
		this._comments = vsApiModOnList.comments;
		this._name = vsApiModOnList.name;
		this._summary = vsApiModOnList.summary;
		this._modidstrs = vsApiModOnList.modidstrs;
		this._author = vsApiModOnList.author;
		this._urlalias = vsApiModOnList.urlalias;
		this._side = vsApiModOnList.side;
		this._type = vsApiModOnList.type;
		this._logo = vsApiModOnList.logo;
		this._tags = vsApiModOnList.tags;
		this._lastreleased = vsApiModOnList.lastreleased;
	}

	/**
	 * The id of the mod.
	 */
	public get modid(): number {
		return this._modid;
	}

	/**
	 * The assetid of the mod.
	 */
	public get assetid(): number {
		return this._assetid;
	}

	/**
	 * The downloads of the mod.
	 */
	public get downloads(): number {
		return this._downloads;
	}

	/**
	 * The follows of the mod.
	 */
	public get follows(): number {
		return this._follows;
	}

	/**
	 * The trendingpoints of the mod.
	 */
	public get trendingpoints(): number {
		return this._trendingpoints;
	}

	/**
	 * The comments of the mod.
	 */
	public get comments(): number {
		return this._comments;
	}

	/**
	 * The name of the mod.
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * The summary of the mod.
	 */
	public get summary(): string | undefined {
		return this._summary;
	}

	/**
	 * The modidstrs of the mod.
	 */
	public get modidstrs(): string[] {
		return this._modidstrs;
	}

	/**
	 * The author of the mod.
	 */
	public get author(): string {
		return this._author;
	}

	/**
	 * The urlalias of the mod.
	 */
	public get urlalias(): string | undefined {
		return this._urlalias;
	}

	/**
	 * The side of the mod.
	 */
	public get side(): string {
		return this._side;
	}

	/**
	 * The type of the mod.
	 */
	public get type(): string {
		return this._type;
	}

	/**
	 * The logo of the mod.
	 */
	public get logo(): string {
		return this._logo;
	}

	/**
	 * The tags of the mod.
	 */
	public get tags(): string[] {
		return this._tags;
	}

	/**
	 * The lastreleased of the mod.
	 */
	public get lastreleased(): string {
		return this._lastreleased;
	}
}
