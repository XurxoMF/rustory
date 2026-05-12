<script lang="ts">
	import { PersistedState } from "runed";

	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	import IconWorld from "@tabler/icons-svelte/icons/world";
	import IconError404 from "@tabler/icons-svelte/icons/error-404";
	import IconTool from "@tabler/icons-svelte/icons/tool";
	import IconFilter from "@tabler/icons-svelte/icons/filter";
	import IconLayoutGrid from "@tabler/icons-svelte/icons/layout-grid";
	import IconLayoutList from "@tabler/icons-svelte/icons/layout-list";
	import IconLetterCase from "@tabler/icons-svelte/icons/letter-case";
	import IconDownload from "@tabler/icons-svelte/icons/download";
	import IconTrendingUp from "@tabler/icons-svelte/icons/trending-up";
	import IconStar from "@tabler/icons-svelte/icons/star";
	import IconSortAscending2 from "@tabler/icons-svelte/icons/sort-ascending-2";
	import IconSortDescending2 from "@tabler/icons-svelte/icons/sort-descending-2";

	import { App } from "$lib/classes/App.svelte";

	import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

	import type { VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import { ModDBApiBasicMod } from "$lib/classes/api/ModDBApiBasicMod.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Combobox from "$lib/components/ui/combobox";
	import * as Empty from "$lib/components/ui/empty";
	import * as Button from "$lib/components/ui/button";
	import * as ToggleGroup from "$lib/components/ui/toggle-group";
	import * as Card from "$lib/components/ui/card";
	import * as Item from "$lib/components/ui/item";
	import * as Badge from "$lib/components/ui/badge";
	import * as Table from "$lib/components/ui/table";
	import * as AspectRatio from "$lib/components/ui/aspect-ratio";
	import * as Pagination from "$lib/components/ui/pagination";
	import * as Sheet from "$lib/components/ui/sheet";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import * as FloatingMenu from "$lib/components/ui/floating-menu";

	const modDBApiBasicModsPromise = ModDBApiBasicMod.fetchAll();

	let vsInstance: VSInstance | undefined = $state(App.data.vsInstances[0]);

	App.breadcrumbs.segments = [{ label: "Vintage Story Mods" }];

	let currentPage: number = $state(1);

	const itemsPerPage = new PersistedState<"20" | "60" | "100">("vs-mods-items-per-page", "20");
	const layout = new PersistedState<"grid" | "list">("vs-mods-layout", "grid");
	const sortBy = new PersistedState<"name" | "downloads" | "trending" | "follows">("vs-mods-sort-by", "name");
	const sortOrder = new PersistedState<"asc" | "desc">("vs-mods-sort-order", "desc");

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
	{#if layout.current === "grid"}
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
			{#each Array(itemsPerPage) as _, i (i)}
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
	{:else}
		<div class="flex flex-col gap-4">
			{#each Array(itemsPerPage) as _, i (i)}
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
	{/if}
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
		{@render pagination({ count: modDBApiBasicMods.length })}

		{#if layout.current === "grid"}
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
				{#each orderModDBApiBasicMods(modDBApiBasicMods).slice(currentPage * Number(itemsPerPage.current) - Number(itemsPerPage.current), currentPage * Number(itemsPerPage.current)) as modDBApiBasicMod (modDBApiBasicMod.modid)}
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
		{:else}
			<div class="flex flex-col gap-4">
				{#each orderModDBApiBasicMods(modDBApiBasicMods).slice(currentPage * Number(itemsPerPage.current) - Number(itemsPerPage.current), currentPage * Number(itemsPerPage.current)) as modDBApiBasicMod (modDBApiBasicMod.modid)}
					<Item.Root variant="outline">
						<Item.Media variant="image">
							<AspectRatio.Root ratio={3 / 3} class="overflow-hidden rounded-lg">
								<img src={modDBApiBasicMod.logo} alt={`${modDBApiBasicMod.name} logo`} />
							</AspectRatio.Root>
						</Item.Media>

						<Item.Content>
							<Item.Title class="line-clamp-1">
								{modDBApiBasicMod.name} -
								<span class="text-muted-foreground">{modDBApiBasicMod.author}</span>
							</Item.Title>

							<Item.Description>
								Follows: {modDBApiBasicMod.follows} · Downloads: {modDBApiBasicMod.downloads} · Comments: {modDBApiBasicMod.comments}
							</Item.Description>
						</Item.Content>

						<Item.Actions>
							<Button.Root
								class="flex-1"
								variant="outline"
								size="sm"
								onclick={() => goto(resolve("/vs-mods/[slug]", { slug: modDBApiBasicMod.modid.toString() }))}
							>
								View
							</Button.Root>
						</Item.Actions>
					</Item.Root>
				{/each}
			</div>
		{/if}

		{@render pagination({ count: modDBApiBasicMods.length })}
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

<!-- Filters and sorting menu -->
<FloatingMenu.Root>
	<FloatingMenu.Group>
		<ToggleGroup.Root type="single" variant="outline" bind:value={sortBy.current}>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<ToggleGroup.Item {...props} value="name" disabled={sortBy.current === "name"} aria-label="Sort the mods by name">
							<IconLetterCase />
						</ToggleGroup.Item>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Sort the mods by name</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<ToggleGroup.Item {...props} value="downloads" disabled={sortBy.current === "downloads"} aria-label="Sort the mods by downloads">
							<IconDownload />
						</ToggleGroup.Item>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Sort the mods by downloads</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<ToggleGroup.Item {...props} value="trending" disabled={sortBy.current === "trending"} aria-label="Sort the mods by trending">
							<IconTrendingUp />
						</ToggleGroup.Item>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Sort the mods by trending</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<ToggleGroup.Item {...props} value="follows" disabled={sortBy.current === "follows"} aria-label="Sort the mods by follows">
							<IconStar />
						</ToggleGroup.Item>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Sort the mods by follows</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</ToggleGroup.Root>
	</FloatingMenu.Group>

	<FloatingMenu.Group>
		<ToggleGroup.Root type="single" variant="outline" bind:value={sortOrder.current}>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<ToggleGroup.Item {...props} value="desc" disabled={sortOrder.current === "desc"} aria-label="Sort in descending order">
							<IconSortDescending2 />
						</ToggleGroup.Item>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Sort the mods in ascending order</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<ToggleGroup.Item {...props} value="asc" disabled={sortOrder.current === "asc"} aria-label="Sort in ascending order">
							<IconSortAscending2 />
						</ToggleGroup.Item>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Sort the mods in descending order</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</ToggleGroup.Root>
	</FloatingMenu.Group>

	<FloatingMenu.Group>
		<ToggleGroup.Root type="single" variant="outline" bind:value={layout.current}>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<ToggleGroup.Item {...props} value="grid" disabled={layout.current === "grid"} aria-label="Change layout to grid">
							<IconLayoutGrid />
						</ToggleGroup.Item>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Change layout to grid</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<ToggleGroup.Item {...props} value="list" disabled={layout.current === "list"} aria-label="Change layout to list">
							<IconLayoutList />
						</ToggleGroup.Item>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Change layout to list</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</ToggleGroup.Root>
	</FloatingMenu.Group>

	<FloatingMenu.Group>
		<ToggleGroup.Root type="single" variant="outline" bind:value={itemsPerPage.current}>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<ToggleGroup.Item {...props} value="20" disabled={itemsPerPage.current === "20"} aria-label="Show 20 items">20</ToggleGroup.Item>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Show 20 items</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<ToggleGroup.Item {...props} value="60" disabled={itemsPerPage.current === "60"} aria-label="Show 60 items">60</ToggleGroup.Item>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Show 60 items</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<ToggleGroup.Item {...props} value="100" disabled={itemsPerPage.current === "100"} aria-label="Show 100 items">100</ToggleGroup.Item>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Show 100 items</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</ToggleGroup.Root>
	</FloatingMenu.Group>

	<FloatingMenu.Group>
		<Sheet.Root>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Sheet.Trigger {...props} class={Button.rootVariants({ variant: "outline", size: "icon" })}>
							<IconFilter />
						</Sheet.Trigger>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Open the filters menu</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Sheet.Content>
				<Sheet.Header>
					<Sheet.Title>Filters</Sheet.Title>
					<Sheet.Description>You can filter mods by many properties here.</Sheet.Description>
				</Sheet.Header>
			</Sheet.Content>
		</Sheet.Root>
	</FloatingMenu.Group>
</FloatingMenu.Root>

{#snippet pagination({ count }: { count: number })}
	<Pagination.Root
		{count}
		perPage={Number(itemsPerPage.current)}
		bind:page={currentPage}
		onPageChange={() => App.UI.contentRef?.scrollTo({ top: 0, behavior: "instant" })}
	>
		{#snippet children({ pages, currentPage })}
			<Pagination.Content>
				<Pagination.Item>
					<Pagination.PrevButton />
				</Pagination.Item>

				{#each pages as page (page.key)}
					{#if page.type === "ellipsis"}
						<Pagination.Item>
							<Pagination.Ellipsis />
						</Pagination.Item>
					{:else}
						<Pagination.Item>
							<Pagination.Link {page} isActive={currentPage === page.value}>
								{page.value}
							</Pagination.Link>
						</Pagination.Item>
					{/if}
				{/each}

				<Pagination.Item>
					<Pagination.NextButton />
				</Pagination.Item>
			</Pagination.Content>
		{/snippet}
	</Pagination.Root>
{/snippet}
