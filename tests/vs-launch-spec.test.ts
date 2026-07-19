import { afterEach, beforeEach, describe, expect, spyOn, test } from "bun:test";

import { AppError, AppErrorCodes } from "../src/lib/classes/errors/AppError.svelte";
import type { Directory } from "../src/lib/classes/utils/Directory.svelte";
import type { File } from "../src/lib/classes/utils/File.svelte";
import type { VSInstance as VSInstanceType } from "../src/lib/classes/vs/VSInstance.svelte";
import type { VSVersion as VSVersionType } from "../src/lib/classes/vs/VSVersion.svelte";

const { VSInstance } = await import("../src/lib/classes/vs/VSInstance.svelte");
const { VSVersion } = await import("../src/lib/classes/vs/VSVersion.svelte");

const versionDir = { path: "/games/versions/1.22.3" } as Directory;
const dataDir = { path: "/games/instances/survival/Data" } as Directory;
const executable = { path: "/games/versions/1.22.3/Vintagestory" } as File;
const vsVersion = { version: "1.22.3", dir: versionDir } as VSVersionType;

let getExecutableMock: ReturnType<typeof spyOn>;

beforeEach(() => {
	getExecutableMock = spyOn(VSVersion, "getExecutable");
});

afterEach(() => {
	getExecutableMock.mockRestore();
});

function createInstance(): VSInstanceType {
	return Object.assign(Object.create(VSInstance.prototype), {
		_id: "survival",
		_name: "Survival",
		_version: "1.22.3",
		_dataDir: dataDir
	}) as VSInstanceType;
}

describe("VSInstance.createLaunchSpec", () => {
	test("creates a reproducible launch configuration for the instance", async () => {
		getExecutableMock.mockResolvedValue(executable);
		const vsInstance = createInstance();

		const firstSpec = await vsInstance.createLaunchSpec(vsVersion);
		const secondSpec = await vsInstance.createLaunchSpec(vsVersion);

		expect(getExecutableMock).toHaveBeenCalledTimes(2);
		expect(getExecutableMock).toHaveBeenNthCalledWith(1, versionDir);
		expect(firstSpec).toEqual({
			instanceId: "survival",
			version: "1.22.3",
			executable,
			workingDir: versionDir,
			dataDir,
			arguments: ["--dataPath", dataDir.path],
			environmentVariables: {}
		});
		expect(secondSpec).toEqual(firstSpec);
	});

	test("returns an immutable launch configuration", async () => {
		getExecutableMock.mockResolvedValue(executable);
		const vsInstance = createInstance();

		const spec = await vsInstance.createLaunchSpec(vsVersion);

		expect(Object.isFrozen(spec)).toBe(true);
		expect(Object.isFrozen(spec.arguments)).toBe(true);
		expect(Object.isFrozen(spec.environmentVariables)).toBe(true);
	});

	test("rejects a version that is not assigned to the instance", async () => {
		const vsInstance = createInstance();
		const differentVersion = { version: "1.22.2", dir: versionDir } as VSVersionType;

		await expect(vsInstance.createLaunchSpec(differentVersion)).rejects.toEqual(expect.objectContaining({ code: AppErrorCodes.VERSION_MISMATCH }));
		expect(getExecutableMock).not.toHaveBeenCalled();
	});

	test("preserves recoverable executable errors", async () => {
		const executableError = new AppError(AppErrorCodes.FILE_SYSTEM_ERROR, "Executable not found");
		getExecutableMock.mockRejectedValue(executableError);
		const vsInstance = createInstance();

		await expect(vsInstance.createLaunchSpec(vsVersion)).rejects.toBe(executableError);
	});
});
