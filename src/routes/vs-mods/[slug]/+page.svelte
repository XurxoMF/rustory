<script lang="ts">
	import { type PageProps } from "./$types";

	import { resolve } from "$app/paths";

	import { App } from "$lib/classes/App.svelte";

	import { type VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Combobox from "$lib/components/ui/combobox";
	import { ModDBApiMod } from "$lib/classes/api/ModDBApiMod.svelte";

	let { params }: PageProps = $props();

	let modDBApiModPromise: Promise<ModDBApiMod> = $derived(ModDBApiMod.fetch(params.slug));

	$effect(() => {
		modDBApiModPromise.then((modDBApiMod) => {
			if (modDBApiMod !== undefined) {
				App.breadcrumbs.segments = [{ label: "Vintage Story Mods", href: resolve("/vs-mods") }, { label: modDBApiMod.name }];
			} else {
				App.breadcrumbs.segments = [{ label: "Vintage Story Mods", href: resolve("/vs-mods") }, { label: "???" }];
			}
		});
	});

	let vsInstance: VSInstance | undefined = $state(App.data.vsInstances[0]);
</script>

<Typo.H1>
	{#await modDBApiModPromise}
		<Typo.H1Skeleton />
	{:then modDBApiMod}
		{modDBApiMod.name}
	{:catch}
		???
	{/await}
</Typo.H1>
<Typo.Leading>View, install and manage this Vintage Story Mod on your Vintage Story Instances.</Typo.Leading>

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
