export type VersionedRelease = {
	tags: string[];
	created?: string | undefined;
};

export type CompatibleReleaseMatch<T extends VersionedRelease> = {
	type: "exact" | "minor";
	release: T;
	matchedTag: string;
	gameVersion: string;
};

type IndexedRelease<T extends VersionedRelease> = {
	release: T;
	index: number;
};

/**
 * Gets the major.minor segment of a Vintage Story version.
 * @param version The version to read.
 * @returns The major.minor segment, if the version has a valid one.
 */
export function getMajorMinorVersion(version: string): string | undefined {
	const versionSegments = version.split(".");

	if (versionSegments.length < 2) return undefined;
	if (!/^\d+$/.test(versionSegments[0])) return undefined;
	if (!/^\d+(?:$|-)/.test(versionSegments[1])) return undefined;

	const minorVersion = versionSegments[1].split("-")[0];

	return `${versionSegments[0]}.${minorVersion}`;
}

/**
 * Checks if two Vintage Story versions belong to the same major.minor version.
 * @param firstVersion The first version to compare.
 * @param secondVersion The second version to compare.
 * @returns Whether both versions share the same major.minor segment.
 */
export function isSameMajorMinorVersion(firstVersion: string, secondVersion: string): boolean {
	const firstMajorMinorVersion = getMajorMinorVersion(firstVersion);
	const secondMajorMinorVersion = getMajorMinorVersion(secondVersion);

	if (firstMajorMinorVersion === undefined) return false;
	if (secondMajorMinorVersion === undefined) return false;

	return firstMajorMinorVersion === secondMajorMinorVersion;
}

/**
 * Finds the best release for a Vintage Story version.
 * Exact matches are preferred. If none exists, it falls back to the newest release in the same major.minor version.
 * @param releases The releases to search.
 * @param gameVersion The Vintage Story version to match.
 * @returns The best compatible release match, if one exists.
 */
export function findCompatibleRelease<T extends VersionedRelease>(releases: T[], gameVersion: string): CompatibleReleaseMatch<T> | undefined {
	const indexedReleases = releases.map((release, index) => ({ release, index }));
	const exactMatches = indexedReleases.filter(({ release }) => release.tags.some((tag) => tag === gameVersion));
	const exactMatch = findNewestIndexedRelease(exactMatches);

	if (exactMatch !== undefined) {
		return {
			type: "exact",
			release: exactMatch.release,
			matchedTag: gameVersion,
			gameVersion
		};
	}

	const minorMatches = indexedReleases.flatMap(({ release, index }) =>
		release.tags
			.filter((tag) => isSameMajorMinorVersion(tag, gameVersion))
			.map((tag) => ({
				release,
				index,
				tag
			}))
	);

	const minorMatch = findNewestIndexedRelease(minorMatches);

	if (minorMatch === undefined) return undefined;

	return {
		type: "minor",
		release: minorMatch.release,
		matchedTag: minorMatch.tag,
		gameVersion
	};
}

function findNewestIndexedRelease<T extends VersionedRelease, R extends IndexedRelease<T>>(releases: R[]): R | undefined {
	const sortedReleases = [...releases].sort((firstRelease, secondRelease) => {
		const firstReleaseTime = getReleaseTime(firstRelease.release);
		const secondReleaseTime = getReleaseTime(secondRelease.release);

		if (firstReleaseTime !== secondReleaseTime) return secondReleaseTime - firstReleaseTime;

		return firstRelease.index - secondRelease.index;
	});

	return sortedReleases[0];
}

function getReleaseTime(release: VersionedRelease): number {
	if (release.created === undefined) return 0;

	const releaseTime = Date.parse(release.created);

	if (Number.isNaN(releaseTime)) return 0;

	return releaseTime;
}
