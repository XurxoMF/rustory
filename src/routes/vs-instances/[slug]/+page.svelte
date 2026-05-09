<script lang="ts">
	import type { PageProps } from "./$types";

	import { resolve } from "$app/paths";

	import { App } from "$lib/classes/App.svelte";

	import { PageLoadError, PageLoadErrorCodes } from "$lib/classes/errors/PageLoadError.svelte";

	import type { VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import * as Typo from "$lib/components/ui/typography";

	import PageSkeleton from "./page-skeleton.svelte";
	import PageContent from "./page-content.svelte";
	import PageError from "./page-error.svelte";

	let { params }: PageProps = $props();

	$effect(() => {
		App.breadcrumbs.segments = [
			{ label: "Vintage Story Instances", href: resolve("/vs-instances") },
			{ label: "Manage", href: resolve("/vs-instances/[slug]", { slug: params.slug }) }
		];
	});

	const pageData = $derived.by(() => load(params.slug));

	/**
	 * Loads the page data.
	 * @returns The page data.
	 * @throws {PageLoadError} The error that happened while loading the page data.
	 */
	async function load(slug: string): Promise<{ vsInstance: VSInstance }> {
		try {
			const vsInstance = App.data.vsInstances.find((i) => i.id === slug);

			// If there is no instance with that id, redirect the user to the instances page.
			if (vsInstance === undefined) throw new PageLoadError(PageLoadErrorCodes.NOT_FOUND, "That Vintage Story Instance does not exist!");

			return { vsInstance };
		} catch (err) {
			App.logger.error(`There was an error loading the page data:\n${err}`);
			throw new PageLoadError(PageLoadErrorCodes.GENERIC_ERROR, "There was an error loading the page data!");
		}
	}
</script>

<Typo.H1>Manage Vintage Story Instance</Typo.H1>
<Typo.Leading>Manage a Vintage Story Instance to add mods, edit settings, etc...</Typo.Leading>

{#await pageData}
	<PageSkeleton />
{:then data}
	<PageContent {data} />
{:catch err: PageLoadError}
	<PageError {err} />
{/await}
