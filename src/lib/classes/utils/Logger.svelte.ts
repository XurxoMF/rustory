import { info, warn, error, debug, trace } from "@tauri-apps/plugin-log";

export class Logger {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor() {}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	// ********************
	// *  STATIC METHODS  *
	// ********************

	/**
	 * Send an info log message.
	 * @param message The message to log.
	 * @param args Arguments to extend the log.
	 */
	public static async info(message: string, args?: { file: string; line: number } | undefined): Promise<void> {
		let msg = ``;

		if (args) msg += `[${args.file}:${args.line}] `;

		msg += message;

		return await info(msg);
	}

	/**
	 * Send a warning log message.
	 * @param message The message to log.
	 * @param args Arguments to extend the log.
	 */
	public static async warn(message: string, args?: { file: string; line: number } | undefined): Promise<void> {
		let msg = ``;

		if (args) msg += `[${args.file}:${args.line}] `;

		msg += message;

		return await warn(msg);
	}

	/**
	 * Send an error log message.
	 * @param message The message to log.
	 * @param args Arguments to extend the log.
	 */
	public static async error(message: string, args?: { file: string; line: number } | undefined): Promise<void> {
		let msg = ``;

		if (args) msg += `[${args.file}:${args.line}] `;

		msg += message;

		return await error(msg);
	}

	/**
	 * Send a debug log message.
	 * @param message The message to log.
	 * @param args Arguments to extend the log.
	 */
	public static async debug(message: string, args?: { file: string; line: number } | undefined): Promise<void> {
		let msg = ``;

		if (args) msg += `[${args.file}:${args.line}] `;

		msg += message;

		return await debug(msg);
	}

	/**
	 * Send a trace log message.
	 * @param message The message to log.
	 * @param args Arguments to extend the log.
	 */
	public static async trace(message: string, args?: { file: string; line: number } | undefined): Promise<void> {
		let msg = ``;

		if (args) msg += `[${args.file}:${args.line}] `;

		msg += message;

		return await trace(msg);
	}
}
