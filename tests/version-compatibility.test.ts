import { describe, expect, test } from "bun:test";

import { findCompatibleRelease, getMajorMinorVersion, isSameMajorMinorVersion, type VersionedRelease } from "../src/lib/helpers/Versions";

type TestRelease = VersionedRelease & {
	id: string;
};

describe("getMajorMinorVersion", () => {
	test("returns major and minor segments from a valid version", () => {
		expect(getMajorMinorVersion("1.20.4")).toBe("1.20");
		expect(getMajorMinorVersion("1.20-pre.1")).toBe("1.20");
	});

	test("returns undefined for malformed versions", () => {
		expect(getMajorMinorVersion("")).toBeUndefined();
		expect(getMajorMinorVersion("1")).toBeUndefined();
		expect(getMajorMinorVersion("1.")).toBeUndefined();
		expect(getMajorMinorVersion("one.20.4")).toBeUndefined();
		expect(getMajorMinorVersion("1.20x.4")).toBeUndefined();
	});
});

describe("isSameMajorMinorVersion", () => {
	test("matches versions with the same major and minor segments", () => {
		expect(isSameMajorMinorVersion("1.20.0", "1.20.4")).toBe(true);
	});

	test("does not match prefix-compatible but different minor versions", () => {
		expect(isSameMajorMinorVersion("1.2.9", "1.20.0")).toBe(false);
	});
});

describe("findCompatibleRelease", () => {
	test("prefers the newest exact match", () => {
		const releases: TestRelease[] = [
			createRelease("old-exact", ["1.20.4"], "2026-01-01T00:00:00Z"),
			createRelease("new-exact", ["1.20.4"], "2026-02-01T00:00:00Z"),
			createRelease("minor", ["1.20.3"], "2026-03-01T00:00:00Z")
		];

		const match = findCompatibleRelease(releases, "1.20.4");

		expect(match?.type).toBe("exact");
		expect(match?.release.id).toBe("new-exact");
		expect(match?.matchedTag).toBe("1.20.4");
	});

	test("falls back to the newest release with the same major and minor version", () => {
		const releases: TestRelease[] = [
			createRelease("old-minor", ["1.20.1"], "2026-01-01T00:00:00Z"),
			createRelease("new-minor", ["1.20.3"], "2026-03-01T00:00:00Z")
		];

		const match = findCompatibleRelease(releases, "1.20.4");

		expect(match?.type).toBe("minor");
		expect(match?.release.id).toBe("new-minor");
		expect(match?.matchedTag).toBe("1.20.3");
	});

	test("does not treat 1.2 as compatible with 1.20", () => {
		const releases: TestRelease[] = [createRelease("wrong-minor", ["1.2.9"], "2026-01-01T00:00:00Z")];

		const match = findCompatibleRelease(releases, "1.20.0");

		expect(match).toBeUndefined();
	});

	test("returns undefined when there are no compatible releases", () => {
		expect(findCompatibleRelease([], "1.20.0")).toBeUndefined();
		expect(findCompatibleRelease([createRelease("other", ["1.19.8"], "2026-01-01T00:00:00Z")], "1.20.0")).toBeUndefined();
	});

	test("keeps input order as the tie breaker and does not mutate the releases", () => {
		const releases: TestRelease[] = [createRelease("first", ["1.20.3"], "invalid-date"), createRelease("second", ["1.20.2"], "invalid-date")];
		const originalOrder = [...releases];

		const match = findCompatibleRelease(releases, "1.20.4");

		expect(match?.release.id).toBe("first");
		expect(releases).toEqual(originalOrder);
	});

	test("prefers an exact match even when a minor match is newer", () => {
		const releases: TestRelease[] = [
			createRelease("exact", ["1.20.4"], "2026-01-01T00:00:00Z"),
			createRelease("newer-minor", ["1.20.3"], "2026-03-01T00:00:00Z")
		];

		const match = findCompatibleRelease(releases, "1.20.4");

		expect(match?.type).toBe("exact");
		expect(match?.release.id).toBe("exact");
	});
});

function createRelease(id: string, tags: string[], created: string): TestRelease {
	return {
		id,
		tags,
		created
	};
}
