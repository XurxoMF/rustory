import { afterEach, beforeEach, describe, expect, spyOn, test } from "bun:test";

import type { RustoryApiVSVersion } from "../src/lib/classes/api/RustoryApiVSVersion.svelte";
import type { Data as DataType } from "../src/lib/classes/stores/Data.svelte";
import type { Directory as DirectoryType } from "../src/lib/classes/utils/Directory.svelte";
import type { VSInstance as VSInstanceType } from "../src/lib/classes/vs/VSInstance.svelte";
import type { VSVersion as VSVersionType } from "../src/lib/classes/vs/VSVersion.svelte";

const { Data } = await import("../src/lib/classes/stores/Data.svelte");
const { Directory } = await import("../src/lib/classes/utils/Directory.svelte");
const { VSVersion, VSVersionState } = await import("../src/lib/classes/vs/VSVersion.svelte");

const events: string[] = [];

let directoryCreateMock: ReturnType<typeof spyOn>;
let versionCreateMock: ReturnType<typeof spyOn>;
let versionsDir: DirectoryType;
let apiVersion: RustoryApiVSVersion;
let newVersion: VSVersionType;

function createData(versions: VSVersionType[] = []): DataType {
	type DataTestDouble = {
		_vsVersions: VSVersionType[];
		_vsInstances: VSInstanceType[];
		_vsVersionInstallations: Map<string, Promise<void>>;
		setVsVersions: (versions: VSVersionType[]) => Promise<void>;
	};
	const data = Object.create(Data.prototype) as DataTestDouble;

	data._vsVersions = versions;
	data._vsInstances = [];
	data._vsVersionInstallations = new Map();
	data.setVsVersions = async (newVersions: VSVersionType[]) => {
		data._vsVersions = newVersions;
		events.push("register");
	};

	return data as unknown as DataType;
}

beforeEach(() => {
	events.length = 0;

	versionsDir = {
		join: async (version: string) => {
			events.push(`join:${version}`);
			return `/games/versions/${version}`;
		}
	} as unknown as DirectoryType;

	apiVersion = { version: "1.20.4" } as RustoryApiVSVersion;
	newVersion = {
		version: "1.20.4",
		state: VSVersionState.NOT_INSTALLED,
		install: async () => {
			events.push("install");
		}
	} as unknown as VSVersionType;

	directoryCreateMock = spyOn(Directory, "create").mockImplementation(async (path: string) => {
		events.push(`create-directory:${path}`);
		return { path } as DirectoryType;
	});
	versionCreateMock = spyOn(VSVersion, "create").mockImplementation(async () => {
		events.push("create-version");
		return newVersion;
	});
});

afterEach(() => {
	directoryCreateMock.mockRestore();
	versionCreateMock.mockRestore();
});

describe("Data.queueVsVersionInstallation", () => {
	test("does nothing when the version is already installed", async () => {
		const installedVersion = { version: "1.20.4", state: VSVersionState.INSTALLED } as VSVersionType;
		const data = createData([installedVersion]);

		await data.queueVsVersionInstallation(apiVersion, versionsDir);

		expect(events).toEqual([]);
	});

	test("registers a new version before starting its background installation", async () => {
		let finishInstallation: (() => void) | undefined;
		const installationGate = new Promise<void>((resolve) => (finishInstallation = resolve));
		newVersion.install = async () => {
			events.push("install");
			await installationGate;
			newVersion.state = VSVersionState.INSTALLED;
		};

		let backgroundSaved: (() => void) | undefined;
		const backgroundSave = new Promise<void>((resolve) => (backgroundSaved = resolve));
		const data = createData();
		data.save = async () => {
			events.push("save-installation-state");
			backgroundSaved?.();
		};

		await data.queueVsVersionInstallation(apiVersion, versionsDir);
		await Promise.resolve();

		expect(data.vsVersions).toEqual([newVersion]);
		expect(events).toEqual(["join:1.20.4", "create-directory:/games/versions/1.20.4", "create-version", "register", "install"]);

		finishInstallation?.();
		await backgroundSave;
		expect(events.at(-1)).toBe("save-installation-state");
	});

	test("keeps a failed version registered as not installed", async () => {
		newVersion.install = async () => {
			events.push("install");
			throw new Error("Installation failed");
		};

		let backgroundSaved: (() => void) | undefined;
		const backgroundSave = new Promise<void>((resolve) => (backgroundSaved = resolve));
		const data = createData();
		data.save = async () => {
			events.push("save-installation-state");
			backgroundSaved?.();
		};

		await data.queueVsVersionInstallation(apiVersion, versionsDir);
		await backgroundSave;

		expect(data.vsVersions).toEqual([newVersion]);
		expect(newVersion.state).toBe(VSVersionState.NOT_INSTALLED);
		expect(events).toEqual([
			"join:1.20.4",
			"create-directory:/games/versions/1.20.4",
			"create-version",
			"register",
			"install",
			"save-installation-state"
		]);
	});

	test("does not start a duplicate installation for the same version", async () => {
		let finishInstallation: (() => void) | undefined;
		const installationGate = new Promise<void>((resolve) => (finishInstallation = resolve));
		let installationCalls = 0;
		newVersion.install = async () => {
			installationCalls += 1;
			await installationGate;
			newVersion.state = VSVersionState.INSTALLED;
		};

		let backgroundSaved: (() => void) | undefined;
		const backgroundSave = new Promise<void>((resolve) => (backgroundSaved = resolve));
		const data = createData([newVersion]);
		data.save = async () => backgroundSaved?.();

		await data.queueVsVersionInstallation(apiVersion, versionsDir);
		await data.queueVsVersionInstallation(apiVersion, versionsDir);
		await Promise.resolve();

		expect(installationCalls).toBe(1);

		finishInstallation?.();
		await backgroundSave;
	});
});

describe("Data.loadVsVersion", () => {
	test("returns a valid installed version", async () => {
		const installedVersion = { version: "1.20.4", state: VSVersionState.INSTALLED } as VSVersionType;
		const fromDirMock = spyOn(VSVersion, "fromDir").mockResolvedValue(installedVersion);
		const directory = { path: "/games/versions/1.20.4" } as DirectoryType;

		const result = await Data.loadVsVersion(directory);

		expect(result).toBe(installedVersion);
		fromDirMock.mockRestore();
	});

	test("preserves an invalid registered version as not installed", async () => {
		const fromDirMock = spyOn(VSVersion, "fromDir").mockRejectedValue(new Error("Missing executable"));
		const directory = {
			path: "/games/versions/1.20.4",
			getName: async () => "1.20.4"
		} as DirectoryType;

		const result = await Data.loadVsVersion(directory);

		expect(result).toBe(newVersion);
		expect(versionCreateMock).toHaveBeenCalledWith({ version: "1.20.4", dir: directory, state: VSVersionState.NOT_INSTALLED });
		fromDirMock.mockRestore();
	});
});
