import { afterEach, beforeEach, describe, expect, spyOn, test } from "bun:test";

import { AppError, AppErrorCodes } from "../src/lib/classes/errors/AppError.svelte";
import type { RustoryApiVSVersion } from "../src/lib/classes/api/RustoryApiVSVersion.svelte";
import type { Directory } from "../src/lib/classes/utils/Directory.svelte";
import type { Zip } from "../src/lib/classes/utils/Zip.svelte";
import type { VSVersion as VSVersionType } from "../src/lib/classes/vs/VSVersion.svelte";

const events: string[] = [];

const { VSVersion } = await import("../src/lib/classes/vs/VSVersion.svelte");

let installTempDir: Directory;
let stagingDir: Directory;
let targetDir: Directory;
let downloadedZip: Zip;
let fromDirMock: ReturnType<typeof spyOn>;

beforeEach(() => {
	events.length = 0;

	installTempDir = {
		path: "/app/cache/tmp/vs-version-installs/install-id",
		delete: async () => {
			events.push("delete-temp");
		}
	} as unknown as Directory;

	stagingDir = {
		path: "/games/versions/.1.20.4.staging-install-id",
		delete: async () => {
			events.push("delete-staging");
		},
		rename: async (destination: Directory) => {
			expect(destination).toBe(targetDir);
			events.push("rename-staging");
		}
	} as unknown as Directory;

	targetDir = {
		path: "/games/versions/1.20.4"
	} as unknown as Directory;

	downloadedZip = {
		path: "/app/cache/tmp/vs-version-installs/install-id/version.zip.tmp",
		extract: async (destination: Directory) => {
			expect(destination).toBe(stagingDir);
			events.push("extract-staging");
		}
	} as unknown as Zip;

	fromDirMock = spyOn(VSVersion, "fromDir").mockImplementation(async (directory: Directory) => {
		expect(directory).toBe(stagingDir);
		events.push("validate-staging");
		return { version: "1.20.4" } as VSVersionType;
	});
});

afterEach(() => {
	fromDirMock.mockRestore();
});

describe("VSVersion.installFiles", () => {
	test("downloads outside the final directory and removes the temporary directory after installation", async () => {
		const apiVersion = {
			version: "1.20.4",
			download: async (destination: Directory) => {
				expect(destination).toBe(installTempDir);
				events.push("download");
				return downloadedZip;
			}
		} as unknown as RustoryApiVSVersion;

		await VSVersion.installFiles(apiVersion, targetDir, installTempDir, stagingDir);

		expect(events).toEqual(["download", "extract-staging", "validate-staging", "rename-staging", "delete-temp"]);
	});

	test("cleans the temporary directory without touching the final directory when the download fails", async () => {
		const apiVersion = {
			download: async () => {
				events.push("download");
				throw new Error("Download failed");
			}
		} as unknown as RustoryApiVSVersion;

		try {
			await VSVersion.installFiles(apiVersion, targetDir, installTempDir, stagingDir);
			throw new Error("Expected installation to fail");
		} catch (err) {
			expect(err).toHaveProperty("message", "Download failed");
		}

		expect(events).toEqual(["download", "delete-staging", "delete-temp"]);
	});

	test("cleans the temporary directory without touching the final directory when checksum validation fails", async () => {
		const apiVersion = {
			download: async () => {
				events.push("download");
				throw new AppError(AppErrorCodes.CHECKSUM_MISMATCH, "Checksum mismatch");
			}
		} as unknown as RustoryApiVSVersion;

		try {
			await VSVersion.installFiles(apiVersion, targetDir, installTempDir, stagingDir);
			throw new Error("Expected installation to fail");
		} catch (err) {
			expect(err).toHaveProperty("code", AppErrorCodes.CHECKSUM_MISMATCH);
		}

		expect(events).toEqual(["download", "delete-staging", "delete-temp"]);
	});

	test("does not publish or touch the final directory when extraction fails", async () => {
		const apiVersion = {
			version: "1.20.4",
			download: async () => {
				events.push("download");
				return {
					extract: async () => {
						events.push("extract-staging");
						throw new Error("Invalid ZIP");
					}
				} as unknown as Zip;
			}
		} as unknown as RustoryApiVSVersion;

		await expect(VSVersion.installFiles(apiVersion, targetDir, installTempDir, stagingDir)).rejects.toThrow("Invalid ZIP");

		expect(events).toEqual(["download", "extract-staging", "delete-staging", "delete-temp"]);
	});

	test("does not publish a staging directory containing a different version", async () => {
		const apiVersion = {
			version: "1.20.4",
			download: async () => {
				events.push("download");
				return downloadedZip;
			}
		} as unknown as RustoryApiVSVersion;

		fromDirMock.mockImplementation(async () => {
			events.push("validate-staging");
			return { version: "1.20.3" } as VSVersionType;
		});

		await expect(VSVersion.installFiles(apiVersion, targetDir, installTempDir, stagingDir)).rejects.toEqual(
			expect.objectContaining({ code: AppErrorCodes.VERSION_MISMATCH })
		);

		expect(events).toEqual(["download", "extract-staging", "validate-staging", "delete-staging", "delete-temp"]);
	});
});
