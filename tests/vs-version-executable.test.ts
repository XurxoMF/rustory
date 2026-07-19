import { describe, expect, test } from "bun:test";

import { AppErrorCodes } from "../src/lib/classes/errors/AppError.svelte";
import type { Directory } from "../src/lib/classes/utils/Directory.svelte";
import type { File } from "../src/lib/classes/utils/File.svelte";

const { VSVersion } = await import("../src/lib/classes/vs/VSVersion.svelte");

function createFile(path: string): File {
	return { path } as File;
}

function createDirectory(path: string, files: File[]): Directory {
	return {
		path,
		getContents: async () => ({ files, directories: [] })
	} as unknown as Directory;
}

describe("VSVersion.getExecutable", () => {
	test("selects Vintagestory.exe from the version root on Windows", async () => {
		const executable = createFile("C:\\games\\1.22.3\\Vintagestory.exe");
		const dir = createDirectory("C:\\games\\1.22.3", [executable]);

		await expect(VSVersion.getExecutable(dir, "windows")).resolves.toBe(executable);
	});

	test("selects Vintagestory from the version root on Linux", async () => {
		const nativeExecutable = createFile("/games/1.22.3/Vintagestory");
		const dir = createDirectory("/games/1.22.3", [nativeExecutable]);

		await expect(VSVersion.getExecutable(dir, "linux")).resolves.toBe(nativeExecutable);
	});

	test("rejects Vintagestory.exe on Linux", async () => {
		const windowsExecutable = createFile("/games/1.22.3/Vintagestory.exe");
		const dir = createDirectory("/games/1.22.3", [windowsExecutable]);

		await expect(VSVersion.getExecutable(dir, "linux")).rejects.toEqual(expect.objectContaining({ code: AppErrorCodes.FILE_SYSTEM_ERROR }));
	});

	test("selects the executable from the normalized version root on macOS", async () => {
		const executable = createFile("/games/1.22.3/Vintagestory");
		const dir = createDirectory("/games/1.22.3", [executable]);

		await expect(VSVersion.getExecutable(dir, "macos")).resolves.toBe(executable);
	});

	test("rejects Vintagestory.exe on macOS", async () => {
		const windowsExecutable = createFile("/games/1.22.3/Vintagestory.exe");
		const dir = createDirectory("/games/1.22.3", [windowsExecutable]);

		await expect(VSVersion.getExecutable(dir, "macos")).rejects.toEqual(expect.objectContaining({ code: AppErrorCodes.FILE_SYSTEM_ERROR }));
	});

	test("does not accept a different filename ending in Vintagestory", async () => {
		const lookalike = createFile("/games/1.22.3/NotVintagestory");
		const dir = createDirectory("/games/1.22.3", [lookalike]);

		await expect(VSVersion.getExecutable(dir, "linux")).rejects.toEqual(expect.objectContaining({ code: AppErrorCodes.FILE_SYSTEM_ERROR }));
	});

	test("rejects unsupported platforms before reading the version directory", async () => {
		let directoryWasRead = false;
		const dir = {
			path: "/games/1.22.3",
			getContents: async () => {
				directoryWasRead = true;
				return { files: [], directories: [] };
			}
		} as unknown as Directory;

		await expect(VSVersion.getExecutable(dir, "android")).rejects.toEqual(expect.objectContaining({ code: AppErrorCodes.UNSUPPORTED_PLATFORM }));
		expect(directoryWasRead).toBe(false);
	});
});
