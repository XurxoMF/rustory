<script lang="ts">
	import { resolve } from "$app/paths";

	import IconWorld from "@tabler/icons-svelte/icons/world";
	import IconError404 from "@tabler/icons-svelte/icons/error-404";
	import IconTool from "@tabler/icons-svelte/icons/tool";

	import { App } from "$lib/classes/App.svelte";

	import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

	import type { VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import { ModDBApiBasicMod } from "$lib/classes/api/ModDBApiBasicMod.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Combobox from "$lib/components/ui/combobox";
	import * as Empty from "$lib/components/ui/empty";
	import * as Button from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as Badge from "$lib/components/ui/badge";
	import * as Table from "$lib/components/ui/table";
	import * as AspectRatio from "$lib/components/ui/aspect-ratio";
	import { goto } from "$app/navigation";

	const modDBApiBasicModsPromise = ModDBApiBasicMod.fetchAll();

	App.breadcrumbs.segments = [{ label: "Vintage Story Mods" }];

	let vsInstance: VSInstance | undefined = $state(App.data.vsInstances[0]);
</script>

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
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
		{#each Array(20) as _, i (i)}
			<Card.Root>
				<Card.Header>
					<Card.Title><Card.TitleSkeleton /></Card.Title>

					<Card.Description>
						<Card.DescriptionSkeleton />
						<Card.DescriptionSkeleton />
					</Card.Description>

					<Card.Action>
						<Badge.Skeleton />
					</Card.Action>
				</Card.Header>

				<Card.Content class="mt-auto">
					<AspectRatio.Skeleton ratio={3 / 2} class="overflow-hidden rounded-lg" />

					<Table.Root class="mt-4">
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
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
{:then modDBApiBasicMods}
	{#if modDBApiBasicMods.length === 0}
		<Empty.Root>
			<Empty.Header>
				<Empty.Media variant="icon">
					<IconTool />
				</Empty.Media>

				<Empty.Title>No Vintage Story Mods found!</Empty.Title>

				<Empty.Description>Something is wrong in here... how the hell there are no mods?</Empty.Description>
			</Empty.Header>

			<Empty.Content>
				<Button.Root variant="outline">
					<a href={resolve("/")}> Return to home! </a>
				</Button.Root>
			</Empty.Content>
		</Empty.Root>
	{:else}
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
			{#each modDBApiBasicMods?.sort((a, b) => b.downloads - a.downloads).slice(0, 20) as modDBApiBasicMod (modDBApiBasicMod.modid)}
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
									<Table.Cell class="text-muted-foreground" align="left">Comments</Table.Cell>
									<Table.Cell class="font-bold" align="right">{modDBApiBasicMod.comments}</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table.Root>
					</Card.Content>

					<Card.Footer class="flex justify-end gap-2">
						<Button.Root
							class="flex-1"
							variant="outline"
							onclick={() => goto(resolve("/vs-mods/[slug]", { slug: modDBApiBasicMod.modid.toString() }))}
						>
							View
						</Button.Root>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	{/if}
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
