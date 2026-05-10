<script lang="ts" module>
	export type ModDBApiModOnListCardProps = {
		modDBApiBasicMod: ModDBApiBasicMod;
		vsInstance?: VSInstance | undefined;
	};
</script>

<script lang="ts">
	import { App } from "$lib/classes/App.svelte";

	import type { VSInstance } from "$lib/classes/vs/VSInstance.svelte";
	import { VSMod } from "$lib/classes/vs/VSMod.svelte";

	import type { ModDBApiBasicMod } from "$lib/classes/api/ModDBApiBasicMod.svelte";

	import * as Button from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as Badge from "$lib/components/ui/badge";
	import * as Table from "$lib/components/ui/table";
	import * as AspectRatio from "$lib/components/ui/aspect-ratio";

	let { modDBApiBasicMod, vsInstance }: ModDBApiModOnListCardProps = $props();

	const modDBApiModPromise = $derived(modDBApiBasicMod.toModDBApiMod());
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-lg">{modDBApiBasicMod.name}</Card.Title>

		<Card.Description class="line-clamp-2">{modDBApiBasicMod.summary}</Card.Description>

		<Card.Action>
			<Badge.Root variant="outline">{modDBApiBasicMod.side}</Badge.Root>
		</Card.Action>
	</Card.Header>

	<Card.Content class="mt-auto">
		<AspectRatio.Root ratio={3 / 2} class="overflow-hidden rounded-lg">
			<img src={modDBApiBasicMod.logo} alt={`${modDBApiBasicMod.name} logo`} />
		</AspectRatio.Root>

		<Table.Root class="mt-4">
			<Table.Body>
				<Table.Row>
					<Table.Cell class="text-muted-foreground" align="left">Author</Table.Cell>
					<Table.Cell class="font-bold" align="right">{modDBApiBasicMod.author}</Table.Cell>
				</Table.Row>

				<Table.Row>
					<Table.Cell class="text-muted-foreground" align="left">Follows</Table.Cell>
					<Table.Cell class="font-bold" align="right">{modDBApiBasicMod.follows}</Table.Cell>
				</Table.Row>

				<Table.Row>
					<Table.Cell class="text-muted-foreground" align="left">Downloads</Table.Cell>
					<Table.Cell class="font-bold" align="right">{modDBApiBasicMod.downloads}</Table.Cell>
				</Table.Row>

				<Table.Row>
					<Table.Cell class="text-muted-foreground" align="left">Total time played</Table.Cell>
					<Table.Cell class="font-bold" align="right">{modDBApiBasicMod.comments}</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	</Card.Content>

	<Card.Footer class="flex justify-end gap-2">
		<Button.Root class="flex-1" variant="outline" onclick={() => App.toaster.toast.info("Not implemented yet!")}>View</Button.Root>

		{#await modDBApiModPromise}
			<Button.Skeleton class="flex-1" />
		{:then modDBApiMod}
			<Button.Root
				class="flex-1"
				onclick={async () => {
					const zip = await modDBApiMod!.releases[0]?.download(vsInstance!.modsDir, modDBApiMod!.name);

					const vsMod = await VSMod.fromZip(zip);

					vsInstance!.mods = [...vsInstance!.mods, vsMod];
				}}
				disabled={!vsInstance || !modDBApiMod}
			>
				Install
			</Button.Root>
		{/await}
	</Card.Footer>
</Card.Root>
