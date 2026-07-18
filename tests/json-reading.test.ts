import { beforeEach, describe, expect, mock, test } from "bun:test";

import { AppErrorCodes } from "../src/lib/classes/errors/AppError.svelte";
import type { Directory } from "../src/lib/classes/utils/Directory.svelte";

let fileContents = "";
let zipContents = "";

mock.module("$lib/classes/App.svelte", () => ({
	App: {
		logger: {
			debug: () => undefined,
			error: () => undefined
		}
	}
}));

mock.module("$lib/classes/utils/Directory.svelte", () => ({ Directory: class {} }));

mock.module("@tauri-apps/api/path", () => ({
	dirname: async () => "/data"
}));

mock.module("@tauri-apps/plugin-fs", () => ({
	create: async () => undefined,
	exists: async () => true,
	readTextFile: async () => fileContents,
	remove: async () => undefined,
	writeTextFile: async () => undefined
}));

mock.module("@tauri-apps/api/core", () => ({
	invoke: async () => zipContents
}));

const { File } = await import("../src/lib/classes/utils/File.svelte");
const { Zip } = await import("../src/lib/classes/utils/Zip.svelte");

const directory = {
	ensureExists: async () => undefined
} as unknown as Directory;

beforeEach(() => {
	fileContents = "";
	zipContents = "";
});

describe("File.readJSON", () => {
	test("returns an empty object for a new empty file", async () => {
		const file = new File({ path: "/data/config.json", directory });

		expect(await file.readJSON<Record<string, never>>()).toEqual({});
	});

	test("parses any valid JSON value", async () => {
		fileContents = "  [1, 2, 3]  ";
		const file = new File({ path: "/data/data.json", directory });

		expect(await file.readJSON<number[]>()).toEqual([1, 2, 3]);
	});

	test("reports malformed JSON with its domain error code", async () => {
		fileContents = "{broken";
		const file = new File({ path: "/data/instance.json", directory });

		try {
			await file.readJSON();
			throw new Error("Expected JSON reading to fail");
		} catch (err) {
			expect(err).toHaveProperty("code", AppErrorCodes.MALFORMED_DATA);
			expect(err).toHaveProperty("message", expect.stringContaining("/data/instance.json"));
		}
	});
});

describe("Zip.readJSONFromFile", () => {
	test("returns an empty object when the archive entry is absent", async () => {
		const zip = new Zip({ path: "/data/mod.zip", directory });

		expect(await zip.readJSONFromFile<Record<string, never>>("modinfo.json")).toEqual({});
	});

	test("parses valid JSON after trimming whitespace", async () => {
		zipContents = '  {"name":"Example"}\n';
		const zip = new Zip({ path: "/data/mod.zip", directory });

		expect(await zip.readJSONFromFile<{ name: string }>("modinfo.json")).toEqual({ name: "Example" });
	});

	test("reports malformed archive JSON with its domain error code", async () => {
		zipContents = "not-json";
		const zip = new Zip({ path: "/data/mod.zip", directory });

		try {
			await zip.readJSONFromFile("modinfo.json");
			throw new Error("Expected archive JSON reading to fail");
		} catch (err) {
			expect(err).toHaveProperty("code", AppErrorCodes.MALFORMED_DATA);
			expect(err).toHaveProperty("message", expect.stringContaining("modinfo.json"));
		}
	});
});
