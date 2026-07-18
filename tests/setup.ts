import { mock } from "bun:test";

mock.module("$lib/classes/utils/Logger.svelte", () => ({
	Logger: {
		debug: async () => undefined,
		error: async () => undefined,
		info: async () => undefined,
		trace: async () => undefined,
		warn: async () => undefined
	}
}));
