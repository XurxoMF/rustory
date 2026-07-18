import { describe, expect, mock, test } from "bun:test";

import { AppErrorCodes } from "../src/lib/classes/errors/AppError.svelte";

mock.module("$lib/classes/App.svelte", () => ({ App: { logger: { debug: () => undefined, error: () => undefined } } }));
mock.module("$lib/classes/utils/Directory.svelte", () => ({ Directory: class {} }));

const { Data } = await import("../src/lib/classes/stores/Data.svelte");

describe("Data.parseJSON", () => {
	test("accepts the current schema without changing path order", () => {
		const data = Data.parseJSON({
			schemaVersion: Data.SCHEMA_VERSION,
			vsVersionsPaths: ["/versions/1.20", "/versions/1.19"],
			vsInstancesPaths: ["/instances/main"]
		});

		expect(data).toEqual({
			schemaVersion: 1,
			vsVersionsPaths: ["/versions/1.20", "/versions/1.19"],
			vsInstancesPaths: ["/instances/main"]
		});
	});

	test("migrates legacy and incomplete data", () => {
		expect(Data.parseJSON({})).toEqual({ schemaVersion: 1, vsVersionsPaths: [], vsInstancesPaths: [] });
		expect(Data.parseJSON({ vsVersionsPaths: ["/versions/1.20"] })).toEqual({
			schemaVersion: 1,
			vsVersionsPaths: ["/versions/1.20"],
			vsInstancesPaths: []
		});
	});

	test.each([
		["non-object root", null],
		["unsupported schema", { schemaVersion: 0 }],
		["non-array version paths", { vsVersionsPaths: "/versions" }],
		["non-string version path", { vsVersionsPaths: [5] }],
		["empty instance path", { vsInstancesPaths: [""] }]
	] as const)("rejects %s", (_name, rawData) => {
		expect(() => Data.parseJSON(rawData)).toThrow(expect.objectContaining({ code: AppErrorCodes.MALFORMED_DATA }));
	});
});
