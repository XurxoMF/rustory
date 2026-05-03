import type { PageLoad } from "./$types";

import { goto } from "$app/navigation";
import { resolve } from "$app/paths";

import { cleanForPath } from "$lib/utils";

import { App } from "$lib/classes/App.svelte";

import { Directory } from "$lib/classes/utils/Directory.svelte";

import { RAPIVSVersion, type RAPIVSVersionJSON } from "$lib/classes/api/RAPIVSVersion.svelte";

export const load: PageLoad = async () => {
	// If the user is offline, redirect them to the homepage.
	if (!App.info.isOnline) {
		App.logger.warn("You can't create a Vintage Story Instance while offline.");
		App.toaster.toast.warning("You can't create a Vintage Story Instance while offline.");
		goto(resolve("/"));
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
