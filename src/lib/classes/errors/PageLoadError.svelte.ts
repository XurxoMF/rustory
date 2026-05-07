/**
 * An error on the page loading
 */
export class PageLoadError extends Error {
	/**
	 * The name of the error
	 */
	private _name: string;

	/**
	 * The code of the error
	 */
	private _code: PageLoadErrorCodes;

	constructor(code: PageLoadErrorCodes, message: string, options?: ErrorOptions) {
		super(message, options);
		this._name = "PageLoadError";
		this._code = code;
	}

	/**
	 * The name of the error
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * The code of the error
	 */
	public get code(): PageLoadErrorCodes {
		return this._code;
	}

	public toJSON() {
		return {
			name: this._name,
			code: this._code,
			message: this.message,
			stack: this.stack
		};
	}
}

/**
 * The codes of the error
 */
export enum PageLoadErrorCodes {
	GENERIC_ERROR = 1,
	OFFLINE = 2,
	NOT_FOUND = 3
}
