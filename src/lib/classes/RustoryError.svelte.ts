/**
 * An error on the app
 */
export class RustoryError extends Error {
	/**
	 * The name of the error
	 */
	private _name: string;

	/**
	 * The code of the error
	 */
	private _code: RustoryErrorCodes;

	constructor(code: RustoryErrorCodes, message: string, options?: ErrorOptions) {
		super(message, options);
		this._name = "RustoryError";
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
	public get code(): RustoryErrorCodes {
		return this._code;
	}
}

/**
 * The codes of the error
 */
export enum RustoryErrorCodes {
	GENERIC_ERROR = 1,
	NOT_INITIALIZED = 2,
	ERROR_INITIALIZING = 3
}
