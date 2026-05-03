import type { PageLoad } from "./$types";

import { redirect } from "@sveltejs/kit";
import { resolve } from "$app/paths";

import { App } from "$lib/classes/App.svelte";

import { RAPIVSVersion, type RAPIVSVersionJSON } from "$lib/classes/api/RAPIVSVersion.svelte";

export const load: PageLoad = async ({ params }) => {
	// If the app is offline, redirect the user to the homepage.
	if (!App.info.isOnline) redirect(307, resolve("/vs-instances"));

	const instance = App.data.vsInstances.find((i) => i.id === params.slug);

	// If there is no instance with that id, redirect the user to the instances page.
	if (instance === undefined) redirect(307, resolve("/vs-instances"));

	const resVersions: Response = await App.request.get("https://api.rustory.xyz/versions");
	const jsonVersions: RAPIVSVersionJSON[] = await resVersions.json();
	const versions = jsonVersions.map((v) => new RAPIVSVersion({ ...v }));

	return {
		instance,
		versions
	};
};
