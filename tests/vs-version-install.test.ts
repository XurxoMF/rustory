import { beforeEach, describe, expect, test } from "bun:test";

import type { RustoryApiVSVersion } from "../src/lib/classes/api/RustoryApiVSVersion.svelte";
import type { Directory } from "../src/lib/classes/utils/Directory.svelte";
import type { Zip } from "../src/lib/classes/utils/Zip.svelte";

const events: string[] = [];

const { VSVersion } = await import("../src/lib/classes/vs/VSVersion.svelte");

let installTempDir: Directory;
let targetDir: Directory;
let downloadedZip: Zip;

beforeEach(() => {
	events.length = 0;

	installTempDir = {
		path: "/app/cache/tmp/vs-version-installs/install-id",
		delete: async () => {
			events.push("delete-temp");
		}
	} as unknown as Directory;

	targetDir = {
		path: "/games/versions/1.20.4",
		delete: async () => {
			events.push("delete-target");
		},
		ensureExists: async () => {
			events.push("ensure-target");
		}
	} as unknown as Directory;

	downloadedZip = {
		path: "/app/cache/tmp/vs-version-installs/install-id/version.zip.tmp",
		extract: async (destination: Directory) => {
			expect(destination).toBe(targetDir);
			events.push("extract");
		}
	} as unknown as Zip;
});

describe("VSVersion.installFiles", () => {
	test("downloads outside the final directory and removes the temporary directory after installation", async () => {
		const apiVersion = {
			download: async (destination: Directory) => {
				expect(destination).toBe(installTempDir);
				events.push("download");
				return downloadedZip;
			}
		} as unknown as RustoryApiVSVersion;

		await VSVersion.installFiles(apiVersion, targetDir, installTempDir);

		expect(events).toEqual(["download", "delete-target", "ensure-target", "extract", "delete-temp"]);
	});

	test("cleans the temporary directory without touching the final directory when the download fails", async () => {
		const apiVersion = {
			download: async () => {
				events.push("download");
				throw new Error("Download failed");
			}
		} as unknown as RustoryApiVSVersion;

		try {
			await VSVersion.installFiles(apiVersion, targetDir, installTempDir);
			throw new Error("Expected installation to fail");
		} catch (err) {
			expect(err).toHaveProperty("message", "Download failed");
		}

		expect(events).toEqual(["download", "delete-temp"]);
	});
});
