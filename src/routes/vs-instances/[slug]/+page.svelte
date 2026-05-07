<script lang="ts">
	import type { PageProps } from "./$types";

	import { resolve } from "$app/paths";

	import { sleep } from "$lib/utils";

	import { App } from "$lib/classes/App.svelte";

	import { PageLoadError, PageLoadErrorCodes } from "$lib/classes/errors/PageLoadError.svelte";

	import type { VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import PageSkeleton from "./page-skeleton.svelte";
	import PageContent from "./page-content.svelte";
	import PageError from "./page-error.svelte";

	let { params }: PageProps = $props();

	const pageData = $derived.by(() => load(params.slug));

	/**
	 * Loads the page data.
	 * @returns The page data.
	 * @throws {PageLoadError} The error that happened while loading the page data.
	 */
	async function load(slug: string): Promise<{ instance: VSInstance }> {
		try {
			await sleep(2000);

			const instance = App.data.vsInstances.find((i) => i.id === slug);

			// If there is no instance with that id, redirect the user to the instances page.
			if (instance === undefined) throw new PageLoadError(PageLoadErrorCodes.NOT_FOUND, "That Vintage Story Instance does not exist!");

			App.breadcrumbs.segments = [
				{ label: "Vintage Story Instances", href: resolve("/vs-instances") },
				{ label: instance.name, href: resolve("/vs-instances/[slug]", { slug: instance.id }) }
			];

			return { instance };
		} catch (err) {
			App.logger.error(`There was an error loading the page data:\n${err}`);
			throw new PageLoadError(PageLoadErrorCodes.GENERIC_ERROR, "There was an error loading the page data!");
		}
	}
</script>

{#await pageData}
	<PageSkeleton />
{:then data}
	<PageContent {data} />
{:catch err: PageLoadError}
	<PageError {err} />
{/await}
