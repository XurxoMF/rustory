import type { PageLoad } from "./$types";

import { redirect } from "@sveltejs/kit";
import { resolve } from "$app/paths";

import { cleanForPath } from "$lib/utils";

import { App } from "$lib/classes/App.svelte";

import { Directory } from "$lib/classes/utils/Directory.svelte";

import { RAPIVSVersion, type RAPIVSVersionJSON } from "$lib/classes/api/RAPIVSVersion.svelte";

export const load: PageLoad = async () => {
	// If the app is offline, redirect the user to the Vintage Story Instances page.
	if (!App.info.isOnline) {
		App.toaster.toast.error("You are offline!", { description: "Please check your internet connection and try again." });
		redirect(307, resolve("/vs-instances"));
	}

	const name = `Instance ${App.data.vsInstances.length + 1}`;

	const resVersions: Response = await App.request.get("https://api.rustory.xyz/versions");
	const jsonVersions: RAPIVSVersionJSON[] = await resVersions.json();
	const versions = jsonVersions.map((v) => new RAPIVSVersion({ ...v }));

	const cleanName = cleanForPath(name);
	const path = await App.config.vsInstancesDir.join(cleanName);
	const dir = await Directory.create(path);

	return {
		name,
		versions,
		dir
	};
};
