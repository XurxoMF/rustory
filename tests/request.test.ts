import { beforeEach, describe, expect, mock, test } from "bun:test";

import { AppErrorCodes } from "../src/lib/classes/errors/AppError.svelte";

const requestState = {
	isOnline: true
};
const fetchMock = mock(async (_: string): Promise<Response> => new Response("default"));
const downloadMock = mock(async (..._: unknown[]): Promise<void> => undefined);

mock.module("@tauri-apps/plugin-http", () => ({
	fetch: fetchMock
}));

mock.module("@tauri-apps/plugin-upload", () => ({
	download: downloadMock
}));

mock.module("$lib/classes/stores/Info.svelte", () => ({
	Info: {
		get instance() {
			return requestState;
		}
	}
}));

const { Request } = await import("../src/lib/classes/stores/Request.svelte");

beforeEach(async () => {
	requestState.isOnline = true;
	fetchMock.mockClear();
	downloadMock.mockClear();

	const request = await Request.init();
	request.clearCache();
});

describe("Request.get", () => {
	test("reuses the initialized request service", async () => {
		const firstRequest = await Request.init();
		const secondRequest = await Request.init();

		expect(secondRequest).toBe(firstRequest);
		expect(Request.instance).toBe(firstRequest);
	});

	test("caches a response and returns independent clones", async () => {
		fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ value: 1 })));
		const request = await Request.init();

		const firstResponse = await request.get("https://example.com/data");
		const secondResponse = await request.get("https://example.com/data");

		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(await firstResponse.json()).toEqual({ value: 1 });
		expect(await secondResponse.json()).toEqual({ value: 1 });
		expect(firstResponse).not.toBe(secondResponse);
	});

	test("does not read or write cache when caching is disabled", async () => {
		fetchMock.mockResolvedValueOnce(new Response("first"));
		fetchMock.mockResolvedValueOnce(new Response("second"));
		const request = await Request.init();

		const firstResponse = await request.get("https://example.com/data", false);
		const secondResponse = await request.get("https://example.com/data", false);

		expect(fetchMock).toHaveBeenCalledTimes(2);
		expect(await firstResponse.text()).toBe("first");
		expect(await secondResponse.text()).toBe("second");
	});

	test("expires cached responses after thirty minutes", async () => {
		const originalDateNow = Date.now;
		let now = 1_000_000;
		Date.now = () => now;
		fetchMock.mockResolvedValueOnce(new Response("old"));
		fetchMock.mockResolvedValueOnce(new Response("new"));
		const request = await Request.init();

		try {
			const firstResponse = await request.get("https://example.com/data");
			now += 1000 * 60 * 30;
			const secondResponse = await request.get("https://example.com/data");

			expect(fetchMock).toHaveBeenCalledTimes(2);
			expect(await firstResponse.text()).toBe("old");
			expect(await secondResponse.text()).toBe("new");
		} finally {
			Date.now = originalDateNow;
		}
	});

	test("rejects offline requests without calling the network", async () => {
		requestState.isOnline = false;
		const request = await Request.init();

		try {
			await request.get("https://example.com/data");
			throw new Error("Expected the request to fail");
		} catch (err) {
			expect(err).toHaveProperty("code", AppErrorCodes.OFFLINE);
		}

		expect(fetchMock).not.toHaveBeenCalled();
	});

	test("wraps transport failures in an AppError", async () => {
		fetchMock.mockRejectedValueOnce(new Error("network failure"));
		const request = await Request.init();

		try {
			await request.get("https://example.com/data");
			throw new Error("Expected the request to fail");
		} catch (err) {
			expect(err).toHaveProperty("code", AppErrorCodes.GENERIC_ERROR);
			expect(err).toHaveProperty("message", "There was an error making the request to https://example.com/data!");
		}
	});
});

describe("Request.download", () => {
	test("delegates downloads to the Tauri upload plugin", async () => {
		const request = await Request.init();

		await request.download("https://example.com/archive.zip", "/tmp/archive.zip");

		expect(downloadMock).toHaveBeenCalledTimes(1);
		expect(downloadMock).toHaveBeenCalledWith("https://example.com/archive.zip", "/tmp/archive.zip");
	});

	test("rejects offline downloads without calling the plugin", async () => {
		requestState.isOnline = false;
		const request = await Request.init();

		try {
			await request.download("https://example.com/archive.zip", "/tmp/archive.zip");
			throw new Error("Expected the download to fail");
		} catch (err) {
			expect(err).toHaveProperty("code", AppErrorCodes.OFFLINE);
		}

		expect(downloadMock).not.toHaveBeenCalled();
	});
});
