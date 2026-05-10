<script lang="ts">
	import { resolve } from "$app/paths";

	import IconWorld from "@tabler/icons-svelte/icons/world";
	import IconError404 from "@tabler/icons-svelte/icons/error-404";

	import { App } from "$lib/classes/App.svelte";

	import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

	import type { VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import { ModDBApiBasicMod } from "$lib/classes/api/ModDBApiBasicMod.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Combobox from "$lib/components/ui/combobox";
	import * as Empty from "$lib/components/ui/empty";
	import * as Button from "$lib/components/ui/button";

	import ModDBApiBasicModCard from "./moddb-api-basic-mod-card.svelte";
	import ModDBApiBasicModCardSkeleton from "./moddb-api-basic-mod-card-skeleton.svelte";

	const modDBApiBasicModsPromise = ModDBApiBasicMod.fetchAll();

	App.breadcrumbs.segments = [{ label: "Vintage Story Mods" }];

	let vsInstance: VSInstance | undefined = $state(App.data.vsInstances[0]);
</script>

<Typo.H1>Vintage Story Mods</Typo.H1>
<Typo.Leading>View, install and manage Vintage Story Mods on your Vintage Story Instances.</Typo.Leading>

<Combobox.Root value={App.data.vsInstances[0]?.id} onchange={(v) => (vsInstance = App.data.vsInstances.find((i) => i.id === v))}>
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
{#await modDBApiBasicModsPromise}
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
		{#each Array(20) as _, i (i)}
			<ModDBApiBasicModCardSkeleton />
		{/each}
	</div>
{:then modDBApiModsOnList}
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
		{#each modDBApiModsOnList?.sort((a, b) => b.downloads - a.downloads).slice(0, 20) as modDBApiBasicMod (modDBApiBasicMod.modid)}
			<ModDBApiBasicModCard {modDBApiBasicMod} />
		{/each}
	</div>
{:catch err}
	{#if err instanceof AppError && err.code === AppErrorCodes.OFFLINE}
		<Empty.Root>
			<Empty.Header>
				<Empty.Media variant="icon">
					<IconWorld class="text-destructive" />
				</Empty.Media>

				<Empty.Title>You're offline!</Empty.Title>

				<Empty.Description>You can't search mods while you're offline! Check your internet connection and try again later!</Empty.Description>
			</Empty.Header>

			<Empty.Content>
				<Button.Root variant="outline">
					<a href={resolve("/")}> Return to home! </a>
				</Button.Root>
			</Empty.Content>
		</Empty.Root>
	{:else}
		<Empty.Root>
			<Empty.Header>
				<Empty.Media variant="icon">
					<IconError404 class="text-destructive" />
				</Empty.Media>

				<Empty.Title>An error has occurred!</Empty.Title>

				<Empty.Description>Check the logs for more information, ask for help on Discord and try again later!</Empty.Description>
			</Empty.Header>

			<Empty.Content>
				<Button.Root variant="outline">
					<a href={resolve("/")}> Return to home! </a>
				</Button.Root>
			</Empty.Content>
		</Empty.Root>
	{/if}
{/await}
