import { describe, expect, mock, test } from "bun:test";

import { AppErrorCodes } from "../src/lib/classes/errors/AppError.svelte";

mock.module("$lib/classes/api/ModDBApiMod.svelte", () => ({
	ModDBApiMod: class {}
}));

const { VSMod } = await import("../src/lib/classes/vs/VSMod.svelte");

describe("VSMod.parseModinfo", () => {
	test("normalizes lowercase fields", () => {
		const modinfo = VSMod.parseModinfo({
			name: "Carry Capacity",
			modid: "carrycapacity",
			version: "1.2.3",
			description: "Adds bags",
			side: "Universal",
			authors: ["Alice"],
			contributors: ["Bob"],
			type: "Code"
		});

		expect(modinfo).toEqual({
			name: "Carry Capacity",
			modid: "carrycapacity",
			version: "1.2.3",
			description: "Adds bags",
			side: "Universal",
			authors: ["Alice"],
			contributors: ["Bob"],
			type: "Code"
		});
	});

	test("normalizes legacy capitalized fields", () => {
		const modinfo = VSMod.parseModinfo({
			Name: "Legacy Mod",
			ModID: "legacymod",
			Version: "0.9.0",
			Description: "Legacy metadata",
			Side: "Server",
			Authors: ["Alice"],
			Contributors: ["Bob"],
			Type: "Content"
		});

		expect(modinfo.name).toBe("Legacy Mod");
		expect(modinfo.modid).toBe("legacymod");
		expect(modinfo.version).toBe("0.9.0");
		expect(modinfo.description).toBe("Legacy metadata");
		expect(modinfo.side).toBe("Server");
		expect(modinfo.authors).toEqual(["Alice"]);
		expect(modinfo.contributors).toEqual(["Bob"]);
		expect(modinfo.type).toBe("Content");
	});

	test("prefers canonical lowercase fields and supplies collection defaults", () => {
		const modinfo = VSMod.parseModinfo({
			name: "Canonical",
			Name: "Legacy",
			modid: "canonical",
			ModID: "legacy",
			version: "2.0.0",
			Version: "1.0.0"
		});

		expect(modinfo.name).toBe("Canonical");
		expect(modinfo.modid).toBe("canonical");
		expect(modinfo.version).toBe("2.0.0");
		expect(modinfo.authors).toEqual([]);
		expect(modinfo.contributors).toEqual([]);
	});

	test("normalizes singular legacy author fields to the authors collection", () => {
		const lowercaseAuthor = VSMod.parseModinfo({ name: "Example", modid: "example", version: "1.0.0", author: "Alice" });
		const capitalizedAuthor = VSMod.parseModinfo({ name: "Example", modid: "example", version: "1.0.0", Author: "Bob" });

		expect(lowercaseAuthor.authors).toEqual(["Alice"]);
		expect(capitalizedAuthor.authors).toEqual(["Bob"]);
	});

	test.each([
		["name", { modid: "valid", version: "1.0.0" }],
		["modid", { name: "Valid", version: "1.0.0" }],
		["version", { name: "Valid", modid: "valid" }],
		["name", { name: "", modid: "valid", version: "1.0.0" }],
		["modid", { name: "Valid", modid: "", version: "1.0.0" }],
		["version", { name: "Valid", modid: "valid", version: "" }]
	] as const)("rejects a missing or empty %s", (field, rawModinfo) => {
		try {
			VSMod.parseModinfo(rawModinfo);
			throw new Error("Expected modinfo parsing to fail");
		} catch (err) {
			expect(err).toHaveProperty("code", AppErrorCodes.MALFORMED_DATA);
			expect(err).toHaveProperty("message", expect.stringContaining(field));
		}
	});
});
