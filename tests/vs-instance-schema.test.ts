import { describe, expect, test } from "bun:test";

import { AppErrorCodes } from "../src/lib/classes/errors/AppError.svelte";

const { VSInstance } = await import("../src/lib/classes/vs/VSInstance.svelte");

const requiredInstanceData = {
	id: "instance-id",
	name: "Main Instance",
	version: "1.20.4"
};

describe("VSInstance.parseJSON", () => {
	test("accepts the current complete schema", () => {
		const instance = VSInstance.parseJSON({
			schemaVersion: VSInstance.SCHEMA_VERSION,
			...requiredInstanceData,
			description: "Survival world",
			startParams: "--debug",
			backupsLimit: 10,
			backupsAuto: true,
			backupsCompressionLevel: 9,
			lastTimePlayed: 100,
			totalTimePlayed: 200,
			mesaGlThread: true,
			envVars: "EXAMPLE=value"
		});

		expect(instance).toEqual({
			schemaVersion: 1,
			...requiredInstanceData,
			description: "Survival world",
			startParams: "--debug",
			backupsLimit: 10,
			backupsAuto: true,
			backupsCompressionLevel: 9,
			lastTimePlayed: 100,
			totalTimePlayed: 200,
			mesaGlThread: true,
			envVars: "EXAMPLE=value"
		});
	});

	test("migrates a legacy instance and fills optional defaults", () => {
		expect(VSInstance.parseJSON(requiredInstanceData)).toEqual({
			schemaVersion: 1,
			...requiredInstanceData,
			description: "",
			startParams: "",
			backupsLimit: 3,
			backupsAuto: false,
			backupsCompressionLevel: 4,
			lastTimePlayed: 0,
			totalTimePlayed: 0,
			mesaGlThread: false,
			envVars: ""
		});
	});

	test("accepts boundary values", () => {
		const minimum = VSInstance.parseJSON({ ...requiredInstanceData, backupsLimit: 1, backupsCompressionLevel: 0 });
		const maximum = VSInstance.parseJSON({ ...requiredInstanceData, backupsLimit: 10, backupsCompressionLevel: 9 });

		expect(minimum.backupsLimit).toBe(1);
		expect(minimum.backupsCompressionLevel).toBe(0);
		expect(maximum.backupsLimit).toBe(10);
		expect(maximum.backupsCompressionLevel).toBe(9);
	});

	test.each([
		["non-object root", []],
		["unsupported schema", { ...requiredInstanceData, schemaVersion: 2 }],
		["missing ID", { name: "Main Instance", version: "1.20.4" }],
		["empty name", { ...requiredInstanceData, name: "" }],
		["invalid version", { ...requiredInstanceData, version: 20 }],
		["invalid description", { ...requiredInstanceData, description: false }],
		["backup limit below range", { ...requiredInstanceData, backupsLimit: 0 }],
		["non-integer backup limit", { ...requiredInstanceData, backupsLimit: 1.5 }],
		["compression above range", { ...requiredInstanceData, backupsCompressionLevel: 10 }],
		["invalid automatic backups", { ...requiredInstanceData, backupsAuto: "true" }],
		["negative last played time", { ...requiredInstanceData, lastTimePlayed: -1 }],
		["non-finite total played time", { ...requiredInstanceData, totalTimePlayed: Number.NaN }],
		["invalid Mesa GL setting", { ...requiredInstanceData, mesaGlThread: 1 }],
		["invalid environment variables", { ...requiredInstanceData, envVars: [] }]
	] as const)("rejects %s", (_name, rawInstance) => {
		expect(() => VSInstance.parseJSON(rawInstance)).toThrow(expect.objectContaining({ code: AppErrorCodes.MALFORMED_DATA }));
	});
});
