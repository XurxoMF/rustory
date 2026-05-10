/**
 * An error on the app
 */
export class AppError extends Error {
	/**
	 * The name of the error
	 */
	private _name: string;

	/**
	 * The code of the error
	 */
	private _code: AppErrorCodes;

	constructor(code: AppErrorCodes, message: string, options?: ErrorOptions | undefined) {
		super(message, options);
		this._name = "AppError";
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
	public get code(): AppErrorCodes {
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
export enum AppErrorCodes {
	GENERIC_ERROR = 1,
	NOT_INITIALIZED = 2,
	ERROR_INITIALIZING = 3,
	MALFORMED_DATA = 4,
	OFFLINE = 5,
	FILE_SYSTEM_ERROR = 6
}
