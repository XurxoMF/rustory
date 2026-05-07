<script lang="ts">
	import { resolve } from "$app/paths";

	import { cleanForPath, sleep } from "$lib/utils";

	import { App } from "$lib/classes/App.svelte";

	import { PageLoadError, PageLoadErrorCodes } from "$lib/classes/errors/PageLoadError.svelte";

	import { Directory } from "$lib/classes/utils/Directory.svelte";

	import { RAPIVSVersion, type RAPIVSVersionJSON } from "$lib/classes/api/RAPIVSVersion.svelte";

	import PageSkeleton from "./page-skeleton.svelte";
	import PageContent from "./page-content.svelte";
	import PageError from "./page-error.svelte";

	const pageData = load();

	/**
	 * Loads the page data.
	 * @returns The page data.
	 * @throws {PageLoadError} The error that happened while loading the page data.
	 */
	async function load(): Promise<{ name: string; dir: Directory; versions: RAPIVSVersion[] }> {
		try {
			await sleep(2000);

			// If there is no internet connection, no versions will be fetched, so throw an error.
			if (!App.info.isOnline) throw new PageLoadError(PageLoadErrorCodes.OFFLINE, "There is no internet connection!");

			const name = `Instance ${App.data.vsInstances.length + 1}`;

			const cleanName = cleanForPath(name);
			const path = await App.config.vsInstancesDir.join(cleanName);
			const dir = await Directory.create(path);

			const resVersions: Response = await App.request.get("https://api.rustory.xyz/versions");
			const jsonVersions: RAPIVSVersionJSON[] = await resVersions.json();
			const versions = jsonVersions.map((v) => new RAPIVSVersion({ ...v }));

			App.breadcrumbs.segments = [
				{ label: "Vintage Story Instances", href: resolve("/vs-instances") },
				{ label: "Create", href: resolve("/vs-instances/create") }
			];

			return { name, dir, versions };
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
