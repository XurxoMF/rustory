import type { PageLoad } from "./$types";

import { redirect } from "@sveltejs/kit";
import { resolve } from "$app/paths";

import { App } from "$lib/classes/App.svelte";

export const load: PageLoad = async ({ params }) => {
	const instance = App.data.vsInstances.find((i) => i.id === params.slug);

	// If there is no instance with that id, redirect the user to the instances page.
	if (instance === undefined) {
		App.toaster.toast.error("Incorrect Vintage Story Instance!", { description: "That Vintage Story Instance does not exist!" });
		redirect(307, resolve("/vs-instances"));
	}

	return {
		instance
	};
};
