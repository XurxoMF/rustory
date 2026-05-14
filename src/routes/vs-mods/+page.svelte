<script lang="ts">
	import { PersistedState } from "runed";
	import { onMount } from "svelte";

	import { App } from "$lib/classes/App.svelte";

	import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

	import type { VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import { ModDBApiBasicMod } from "$lib/classes/api/ModDBApiBasicMod.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Combobox from "$lib/components/ui/combobox";

	import NoMods from "./no-mods.svelte";
	import GridCard from "./grid-card.svelte";
	import GridCardSkeleton from "./grid-card-skeleton.svelte";
	import ListItem from "./list-item.svelte";
	import ListItemSkeleton from "./list-item-skeleton.svelte";
	import Pagination from "./pagination.svelte";
	import PaginationSkeleton from "./pagination-skeleton.svelte";
	import Offline from "./offline.svelte";
	import GenericError from "./generic-error.svelte";
	import Filters, { type ItemsPerPage, type Layout, type SortBy, type SortOrder } from "./filters.svelte";

	let modDBApiBasicModsPromise = $state(ModDBApiBasicMod.fetchAll());

	let vsInstance: VSInstance | undefined = $state(App.data.vsInstances[0]);

	App.breadcrumbs.segments = [{ label: "Vintage Story Mods" }];

	let currentPage: number = $state(1);

	const itemsPerPage = new PersistedState<ItemsPerPage>("vs-mods-items-per-page", "20");
	const layout = new PersistedState<Layout>("vs-mods-layout", "grid");
	const sortBy = new PersistedState<SortBy>("vs-mods-sort-by", "name");
	const sortOrder = new PersistedState<SortOrder>("vs-mods-sort-order", "desc");

	onMount(() => {
		const taskRefetchID = App.reloader.addTask({
			action: () => {
				modDBApiBasicModsPromise = ModDBApiBasicMod.fetchAll({ cache: false });
			}
		});

		return () => {
			App.reloader.removeTask(taskRefetchID);
		};
	});

	function orderModDBApiBasicMods(modDBApiBasicMods: ModDBApiBasicMod[]): ModDBApiBasicMod[] {
		return modDBApiBasicMods.sort((a, b) => {
			switch (sortBy.current) {
				case "name":
					if (sortOrder.current === "desc") return b.name.localeCompare(a.name);
					return a.name.localeCompare(b.name);
				case "downloads":
					if (sortOrder.current === "desc") return b.downloads - a.downloads;
					return a.downloads - b.downloads;
				case "trending":
					if (sortOrder.current === "desc") return b.trendingpoints - a.trendingpoints;
					return a.trendingpoints - b.trendingpoints;
				case "follows":
					if (sortOrder.current === "desc") return b.follows - a.follows;
					return a.follows - b.follows;
				default:
					return 0;
			}
		});
	}
</script>

<Filters bind:itemsPerPage={itemsPerPage.current} bind:layout={layout.current} bind:sortBy={sortBy.current} bind:sortOrder={sortOrder.current} />

<Typo.H1>Vintage Story Mods</Typo.H1>
<Typo.Leading>View, install and manage Vintage Story Mods on your Vintage Story Instances.</Typo.Leading>

<!-- Vintage Story Instance selector -->
<Combobox.Root value={App.data.vsInstances[0]?.id} onchange={(v) => (vsInstance = App.data.vsInstances.find((i) => i.id === v))}>
	<Combobox.Trigger>{vsInstance?.name || "Select a Vintage Story Instance..."}</Combobox.Trigger>

	<Combobox.Content>
		<Combobox.Input placeholder="Buscar..." />

		<Combobox.List>
			<Combobox.Empty>No Vintage Story Instances found! Create one to install mods!</Combobox.Empty>

			<Combobox.Group>
				{#each App.data.vsInstances as i (i.id)}
					<Combobox.Item value={i.id}>{i.name}</Combobox.Item>
				{/each}
			</Combobox.Group>
		</Combobox.List>
	</Combobox.Content>
</Combobox.Root>

<!-- List of Vintage Story Mods -->
{#await modDBApiBasicModsPromise}
	<PaginationSkeleton />

	{#if layout.current === "grid"}
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
			{#each Array(Number(itemsPerPage.current)) as _, i (i)}
				<GridCardSkeleton />
			{/each}
		</div>
	{:else}
		<div class="flex flex-col gap-4">
			{#each Array(Number(itemsPerPage.current)) as _, i (i)}
				<ListItemSkeleton />
			{/each}
		</div>
	{/if}

	<PaginationSkeleton />
{:then modDBApiBasicMods}
	{#if modDBApiBasicMods.length === 0}
		<NoMods />
	{:else}
		<Pagination count={modDBApiBasicMods.length} itemsPerPage={Number(itemsPerPage.current)} {currentPage} />

		{#if layout.current === "grid"}
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
				{#each orderModDBApiBasicMods(modDBApiBasicMods).slice(currentPage * Number(itemsPerPage.current) - Number(itemsPerPage.current), currentPage * Number(itemsPerPage.current)) as modDBApiBasicMod (modDBApiBasicMod.modid)}
					<GridCard {modDBApiBasicMod} />
				{/each}
			</div>
		{:else}
			<div class="flex flex-col gap-4">
				{#each orderModDBApiBasicMods(modDBApiBasicMods).slice(currentPage * Number(itemsPerPage.current) - Number(itemsPerPage.current), currentPage * Number(itemsPerPage.current)) as modDBApiBasicMod (modDBApiBasicMod.modid)}
					<ListItem {modDBApiBasicMod} />
				{/each}
			</div>
		{/if}

		<Pagination count={modDBApiBasicMods.length} itemsPerPage={Number(itemsPerPage.current)} {currentPage} />
	{/if}
{:catch err}
	{#if err instanceof AppError && err.code === AppErrorCodes.OFFLINE}
		<Offline />
	{:else}
		<GenericError />
	{/if}
{/await}
