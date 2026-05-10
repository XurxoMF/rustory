<script lang="ts">
	import { App } from "$lib/classes/App.svelte";

	import type { VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import { VSAPIModOnList, type VSAPIModOnListJSON } from "$lib/classes/api/VSAPIModOnList.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Combobox from "$lib/components/ui/combobox";

	import VsApiModOnListCard from "./vs-api-mod-on-list-card.svelte";
	import VsApiModOnListCardSkeleton from "./vs-api-mod-on-list-card-skeleton.svelte";

	const vsApiModsOnListPromise = loadVsApiModsOnList();

	App.breadcrumbs.segments = [{ label: "Vintage Story Mods" }];

	let vsInstance: VSInstance | undefined = $state(App.data.vsInstances[0]);

	/**
	 * Loads the VS API mods from the Vintage Story ModDB API.
	 */
	async function loadVsApiModsOnList(): Promise<VSAPIModOnList[]> {
		const resApiModsOnList: Response = await App.request.get("https://mods.vintagestory.at/api/mods");
		const jsonApiModsOnList: { mods: VSAPIModOnListJSON[] } = await resApiModsOnList.json();
		const vsApiModsOnList = jsonApiModsOnList.mods.map((m) => new VSAPIModOnList({ ...m }));

		return vsApiModsOnList;
	}
</script>

<Typo.H1>Vintage Story Mods</Typo.H1>
<Typo.Leading>View, install and manage Vintage Story Mods on your Vintage Story Instances.</Typo.Leading>

<Combobox.Root value={App.data.vsInstances[0].id} onchange={(v) => (vsInstance = App.data.vsInstances.find((i) => i.id === v))}>
	<Combobox.Trigger>{vsInstance?.name || "Select a Vintage Story Instance..."}</Combobox.Trigger>

	<Combobox.Content>
		<Combobox.Input placeholder="Buscar..." />

		<Combobox.List>
			<Combobox.Empty>No Vintage Story Instances found.</Combobox.Empty>

			<Combobox.Group>
				{#each App.data.vsInstances as i (i.id)}
					<Combobox.Item value={i.id}>{i.name}</Combobox.Item>
				{/each}
			</Combobox.Group>
		</Combobox.List>
	</Combobox.Content>
</Combobox.Root>

<!-- List of Vintage Story Instances -->
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
	{#await vsApiModsOnListPromise}
		{#each Array(20) as _, i (i)}
			<VsApiModOnListCardSkeleton />
		{/each}
	{:then vsApiModsOnList}
		{#each vsApiModsOnList.sort((a, b) => b.downloads - a.downloads).slice(0, 20) as vsApiModOnList (vsApiModOnList.modid)}
			<VsApiModOnListCard {vsApiModOnList} />
		{/each}
	{/await}
</div>
