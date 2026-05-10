<script lang="ts">
	import { App } from "$lib/classes/App.svelte";

	import type { VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import { VSAPIModOnList, type VSAPIModOnListJSON } from "$lib/classes/api/VSAPIModOnList.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Button from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as Badge from "$lib/components/ui/badge";
	import * as Table from "$lib/components/ui/table";
	import * as AspectRatio from "$lib/components/ui/aspect-ratio";
	import * as Combobox from "$lib/components/ui/combobox";

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
		{#each Array(6) as _, i (i)}
			<Card.Root>
				<Card.Header>
					<Card.Title>
						<Card.TitleSkeleton />
					</Card.Title>

					<Card.Description>
						<Card.DescriptionSkeleton />
						<Card.DescriptionSkeleton />
					</Card.Description>

					<Card.Action>
						<Badge.Skeleton />
					</Card.Action>
				</Card.Header>

				<Card.Content class="mt-auto">
					<Table.Root>
						<Table.Body>
							{#each Array(4) as _, j (j)}
								<Table.Row>
									<Table.Cell align="left">
										<Table.CellSkeleton />
									</Table.Cell>

									<Table.Cell align="right">
										<Table.CellSkeleton />
									</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</Card.Content>

				<Card.Footer class="flex justify-end gap-2">
					<Button.Skeleton class="flex-1" />

					<Button.Skeleton class="flex-1" />
				</Card.Footer>
			</Card.Root>
		{/each}
	{:then vsApiModsOnList}
		{#each vsApiModsOnList.sort((a, b) => b.downloads - a.downloads).slice(0, 20) as vsApiModOnList (vsApiModOnList.modid)}
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-lg">{vsApiModOnList.name}</Card.Title>

					<Card.Description class="line-clamp-2">{vsApiModOnList.summary}</Card.Description>

					<Card.Action>
						<Badge.Root variant="outline">{vsApiModOnList.side}</Badge.Root>
					</Card.Action>
				</Card.Header>

				<Card.Content class="mt-auto">
					<AspectRatio.Root ratio={3 / 2} class="overflow-hidden rounded-lg">
						<img src={vsApiModOnList.logo} alt={`${vsApiModOnList.name} logo`} />
					</AspectRatio.Root>

					<Table.Root class="mt-4">
						<Table.Body>
							<Table.Row>
								<Table.Cell class="text-muted-foreground" align="left">Author</Table.Cell>
								<Table.Cell class="font-bold" align="right">{vsApiModOnList.author}</Table.Cell>
							</Table.Row>

							<Table.Row>
								<Table.Cell class="text-muted-foreground" align="left">Follows</Table.Cell>
								<Table.Cell class="font-bold" align="right">{vsApiModOnList.follows}</Table.Cell>
							</Table.Row>

							<Table.Row>
								<Table.Cell class="text-muted-foreground" align="left">Downloads</Table.Cell>
								<Table.Cell class="font-bold" align="right">{vsApiModOnList.downloads}</Table.Cell>
							</Table.Row>

							<Table.Row>
								<Table.Cell class="text-muted-foreground" align="left">Total time played</Table.Cell>
								<Table.Cell class="font-bold" align="right">{vsApiModOnList.comments}</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table.Root>
				</Card.Content>

				<Card.Footer class="flex justify-end gap-2">
					<Button.Root class="flex-1" variant="outline" onclick={() => App.toaster.toast.info("Not implemented yet!")}>View</Button.Root>

					<Button.Root class="flex-1" onclick={() => App.toaster.toast.info("Not implemented yet!")}>Install</Button.Root>
				</Card.Footer>
			</Card.Root>
		{/each}
	{:catch err}
		<p>{err.message}</p>
	{/await}
</div>
