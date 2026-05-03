import type { PageLoad } from "./$types";

import { goto } from "$app/navigation";
import { resolve } from "$app/paths";

import { App } from "$lib/classes/App.svelte";

export const load: PageLoad = async ({ params }) => {
	const instance = App.data.vsInstances.find((i) => i.id === params.slug);

	// If there is no instance with that id, redirect them to the instances page.
	if (instance === undefined) {
		App.logger.error("The instance you're trying to see does not exists.");
		App.toaster.toast.error("The instance you're trying to see does not exists.");
		goto(resolve("/vs-instances"));
	}

	return {
		instance: instance!
	};
};
