/**
 * Installed VS Mod info.
 */
export class VSMod {
	/**
	 * The id of the VS Instance this VS Mod is from.
	 */
	private _vsInstanceId: string;

	/**
	 * The name of the VS Mod.
	 */
	private _name: string;

	/**
	 * The modid of the VS Mod.
	 */
	private _modid: string;

	/**
	 * The version of the VS Mod.
	 */
	private _version: string;

	/**
	 * The path to the VS Mod.
	 */
	private _path: string;

	/**
	 * The description of the VS Mod.
	 */
	private _description?: string | undefined;

	/**
	 * The side of the VS Mod.
	 */
	private _side?: string | undefined;

	/**
	 * The authors of the VS Mod.
	 */
	private _authors: string[];

	/**
	 * The contributors of the VS Mod.
	 */
	private _contributors: string[];

	/**
	 * The type of the VS Mod.
	 */
	private _type?: string | undefined;

	/**
	 * If the VS Mod has an image.
	 */
	private _image: boolean;

	/**
	 * The state of the VS Mod.
	 */
	private _state: VSModState;

	public constructor(vsMod: {
		vsInstanceId: string;
		name: string;
		modid: string;
		version: string;
		path: string;
		description?: string | undefined;
		side?: string | undefined;
		authors: string[];
		contributors: string[];
		type?: string | undefined;
		image: boolean;
		state?: VSModState | undefined;
	}) {
		this._vsInstanceId = vsMod.vsInstanceId;
		this._name = vsMod.name;
		this._modid = vsMod.modid;
		this._version = vsMod.version;
		this._path = vsMod.path;
		this._description = vsMod.description;
		this._side = vsMod.side;
		this._authors = vsMod.authors;
		this._contributors = vsMod.contributors;
		this._type = vsMod.type;
		this._image = vsMod.image;
		this._state = $state(vsMod.state ?? VSModState.INSTALLED);
	}

	/**
	 * The id of the VS Instance this VS Mod is from.
	 */
	public get vsInstanceId(): string {
		return this._vsInstanceId;
	}

	/**
	 * The name of the VS Mod.
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * The modid of the VS Mod.
	 */
	public get modid(): string {
		return this._modid;
	}

	/**
	 * The version of the VS Mod.
	 */
	public get version(): string {
		return this._version;
	}

	/**
	 * The path to the VS Mod.
	 */
	public get path(): string {
		return this._path;
	}

	/**
	 * The description of the VS Mod.
	 */
	public get description(): string | undefined {
		return this._description;
	}

	/**
	 * The side of the VS Mod.
	 */
	public get side(): string | undefined {
		return this._side;
	}

	/**
	 * The authors of the VS Mod.
	 */
	public get authors(): string[] {
		return this._authors;
	}

	/**
	 * The contributors of the VS Mod.
	 */
	public get contributors(): string[] {
		return this._contributors;
	}

	/**
	 * The type of the VS Mod.
	 */
	public get type(): string | undefined {
		return this._type;
	}

	/**
	 * If the VS Mod has an image.
	 */
	public get image(): boolean {
		return this._image;
	}

	/**
	 * The state of the VS Mod.
	 */
	public get state(): VSModState {
		return this._state;
	}
}

/**
 * State of the VS Mod.
 */
export enum VSModState {
	INSTALLED = "installed",
	NOT_INSTALLED = "not_installed",
	INSTALLING = "installing",
	DELETING = "deleting",
	UPDATING = "updating"
}
