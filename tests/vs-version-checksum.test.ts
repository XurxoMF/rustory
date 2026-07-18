import { describe, expect, test } from "bun:test";

import { AppErrorCodes } from "../src/lib/classes/errors/AppError.svelte";

const { RustoryApiVSVersion } = await import("../src/lib/classes/api/RustoryApiVSVersion.svelte");

describe("RustoryApiVSVersion.validateSha256", () => {
	test("accepts equal checksums regardless of hexadecimal case", () => {
		const checksum = "a".repeat(64);

		expect(() => RustoryApiVSVersion.validateSha256(checksum.toUpperCase(), checksum)).not.toThrow();
	});

	test("rejects a checksum mismatch with a specific error", () => {
		expect(() => RustoryApiVSVersion.validateSha256("a".repeat(64), "b".repeat(64))).toThrow(
			expect.objectContaining({ code: AppErrorCodes.CHECKSUM_MISMATCH })
		);
	});
});
