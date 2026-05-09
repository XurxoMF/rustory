<script lang="ts">
	import { type PageProps } from "./$types";

	import { tick } from "svelte";

	import { App } from "$lib/classes/App.svelte";

	import { PageLoadError, PageLoadErrorCodes } from "$lib/classes/errors/PageLoadError.svelte";

	import * as Typo from "$lib/components/ui/typography";

	import PageSkeleton from "./page-skeleton.svelte";
	import PageContent, { type ContentPageData } from "./page-content.svelte";
	import PageError from "./page-error.svelte";

	let { params, data }: PageProps = $props();

	const pageDataPromise = $derived.by(() => load(params.slug));

	/**
	 * Loads the page data.
	 * @returns The page data.
	 * @throws {PageLoadError} The error that happened while loading the page data.
	 */
	async function load(slug: string): Promise<ContentPageData> {
		try {
			const vsInstance = App.data.vsInstances.find((i) => i.id === slug);

			// If there is no instance with that id, redirect the user to the instances page.
			if (vsInstance === undefined) throw new PageLoadError(PageLoadErrorCodes.NOT_FOUND, "That Vintage Story Instance does not exist!");

			// Wait for the {#await} block to render the Skeleton again before returning the data.
			await tick();

			return { vsInstance };
		} catch (err) {
			App.logger.error(`There was an error loading the page data:\n${err}`);
			throw new PageLoadError(PageLoadErrorCodes.GENERIC_ERROR, "There was an error loading the page data!");
		}
	}
</script>

<Typo.H1>Manage Vintage Story Instance</Typo.H1>
<Typo.Leading>Manage a Vintage Story Instance to add mods, edit settings, etc...</Typo.Leading>

{#await pageDataPromise}
	<PageSkeleton {params} {data} />
{:then pageData}
	<PageContent {params} {data} {pageData} />
{:catch err: PageLoadError}
	<PageError {params} {data} {err} />
{/await}
