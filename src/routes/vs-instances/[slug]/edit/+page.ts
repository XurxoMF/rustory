import type { PageLoad } from "./$types";

import { goto } from "$app/navigation";
import { resolve } from "$app/paths";

import { App } from "$lib/classes/App.svelte";

import { RAPIVSVersion, type RAPIVSVersionJSON } from "$lib/classes/api/RAPIVSVersion.svelte";

export const load: PageLoad = async ({ params }) => {
	// If the user is offline, redirect them to the homepage.
	if (!App.info.isOnline) {
		App.logger.warn("You can't edit a Vintage Story Instance while offline.");
		App.toaster.toast.warning("You can't edit a Vintage Story Instance while offline.");
		goto(resolve("/"));
	}

	const instance = App.data.vsInstances.find((i) => i.id === params.slug);

	// If there is no instance with that id, redirect them to the instances page.
	if (instance === undefined) {
		App.logger.error("The instance you're trying to edit does not exists.");
		App.toaster.toast.error("The instance you're trying to edit does not exists.");
		goto(resolve("/vs-instances"));
	}

	const resVersions: Response = await App.request.get("https://api.rustory.xyz/versions");
	const jsonVersions: RAPIVSVersionJSON[] = await resVersions.json();
	const versions = jsonVersions.map((v) => new RAPIVSVersion({ ...v }));

	return {
		instance: instance!,
		versions
	};
};
