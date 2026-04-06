/**
 * Mod Tag queried from the ModDB.
 */
export class VSAPIModTag {
	/**
	 * The id of the tag.
	 */
	private _tagid: number;

	/**
	 * The name of the tag.
	 */
	private _name: string;

	/**
	 * The color of the tag.
	 */
	private _color: string;

	public constructor(vsApiModTag: { tagid: number; name: string; color: string }) {
		this._tagid = vsApiModTag.tagid;
		this._name = vsApiModTag.name;
		this._color = vsApiModTag.color;
	}

	/**
	 * The id of the tag.
	 */
	public get tagid(): number {
		return this._tagid;
	}

	/**
	 * The name of the tag.
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * The color of the tag.
	 */
	public get color(): string {
		return this._color;
	}
}
