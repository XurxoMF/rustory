import { describe, expect, test } from "bun:test";

import { AppErrorCodes } from "../src/lib/classes/errors/AppError.svelte";

const { RustoryApiVSVersion } = await import("../src/lib/classes/api/RustoryApiVSVersion.svelte");

const version = new RustoryApiVSVersion({
	version: "1.22.3",
	type: "stable",
	releaseDate: 1,
	importedDate: 2,
	windows: "windows-url",
	windowsSha: "windows-sha",
	linux: "linux-url",
	linuxSha: "linux-sha",
	macosX64: "macos-x64-url",
	macosX64Sha: "macos-x64-sha",
	macosArm64: "macos-arm64-url",
	macosArm64Sha: "macos-arm64-sha"
});

describe("RustoryApiVSVersion.getArtifact", () => {
	test("selects the Windows artifact", () => {
		expect(version.getArtifact("windows", "x86_64")).toEqual({ url: "windows-url", sha256: "windows-sha" });
	});

	test("selects the Linux artifact", () => {
		expect(version.getArtifact("linux", "x86_64")).toEqual({ url: "linux-url", sha256: "linux-sha" });
	});

	test("selects the macOS x64 artifact on Intel Macs", () => {
		expect(version.getArtifact("macos", "x86_64")).toEqual({ url: "macos-x64-url", sha256: "macos-x64-sha" });
	});

	test("selects the macOS ARM64 artifact on Apple Silicon", () => {
		expect(version.getArtifact("macos", "aarch64")).toEqual({ url: "macos-arm64-url", sha256: "macos-arm64-sha" });
	});

	test("rejects unsupported operating systems and architectures", () => {
		expect(() => version.getArtifact("macos", "arm")).toThrow(expect.objectContaining({ code: AppErrorCodes.UNSUPPORTED_PLATFORM }));
		expect(() => version.getArtifact("ios", "aarch64")).toThrow(expect.objectContaining({ code: AppErrorCodes.UNSUPPORTED_PLATFORM }));
	});
});
