import { describe, expect, mock, test } from "bun:test";

import { AppErrorCodes } from "../src/lib/classes/errors/AppError.svelte";

mock.module("$lib/paraglide/runtime", () => ({
	baseLocale: "en-EN",
	isLocale: () => true,
	setLocale: () => undefined
}));

mock.module("$lib/classes/App.svelte", () => ({
	App: {
		logger: {
			debug: () => undefined,
			error: () => undefined,
			warn: () => undefined
		}
	}
}));

mock.module("$lib/classes/utils/Directory.svelte", () => ({ Directory: class {} }));

const { Config } = await import("../src/lib/classes/stores/Config.svelte");

const defaults = {
	locale: "en-EN" as const,
	vsVersionsPath: "/data/VSVersions",
	vsInstancesPath: "/data/VSInstances"
};

describe("Config.parseJSON", () => {
	test("accepts the current schema", () => {
		const config = Config.parseJSON(
			{
				schemaVersion: Config.SCHEMA_VERSION,
				theme: "light",
				locale: "es-ES",
				scale: 1.2,
				logLevel: "debug",
				vsVersionsPath: "/games/versions",
				vsInstancesPath: "/games/instances"
			},
			defaults
		);

		expect(config).toEqual({
			schemaVersion: 1,
			theme: "light",
			locale: "es-ES",
			scale: 1.2,
			logLevel: "debug",
			vsVersionsPath: "/games/versions",
			vsInstancesPath: "/games/instances"
		});
	});

	test("migrates legacy and incomplete data using the existing defaults", () => {
		expect(Config.parseJSON({}, defaults)).toEqual({
			schemaVersion: 1,
			theme: "dark",
			locale: "en-EN",
			scale: 1,
			logLevel: "info",
			vsVersionsPath: "/data/VSVersions",
			vsInstancesPath: "/data/VSInstances"
		});

		expect(Config.parseJSON({ theme: "light", scale: 0.5 }, defaults)).toMatchObject({
			schemaVersion: 1,
			theme: "light",
			scale: 0.5
		});
	});

	test("accepts both configured scale limits", () => {
		expect(Config.parseJSON({ scale: 0.5 }, defaults).scale).toBe(0.5);
		expect(Config.parseJSON({ scale: 1.5 }, defaults).scale).toBe(1.5);
	});

	test.each([
		["non-object root", []],
		["unsupported schema", { schemaVersion: 2 }],
		["invalid theme", { theme: "blue" }],
		["invalid locale", { locale: "gl-ES" }],
		["invalid scale type", { scale: "1" }],
		["scale below range", { scale: 0.4 }],
		["scale above range", { scale: 1.6 }],
		["invalid log level", { logLevel: "verbose" }],
		["empty versions path", { vsVersionsPath: "" }],
		["invalid instances path", { vsInstancesPath: 5 }]
	] as const)("rejects %s", (_name, rawConfig) => {
		expect(() => Config.parseJSON(rawConfig, defaults)).toThrow(expect.objectContaining({ code: AppErrorCodes.MALFORMED_DATA }));
	});
});
