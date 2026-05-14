<script lang="ts" module>
	export type ItemsPerPage = "20" | "60" | "100";
	export type Layout = "grid" | "list";
	export type SortBy = "name" | "downloads" | "trending" | "follows";
	export type SortOrder = "asc" | "desc";

	export type FiltersProps = {
		itemsPerPage: ItemsPerPage;
		layout: Layout;
		sortBy: SortBy;
		sortOrder: SortOrder;
	};
</script>

<script lang="ts">
	import IconFilter from "@tabler/icons-svelte/icons/filter";
	import IconLayoutGrid from "@tabler/icons-svelte/icons/layout-grid";
	import IconLayoutList from "@tabler/icons-svelte/icons/layout-list";
	import IconLetterCase from "@tabler/icons-svelte/icons/letter-case";
	import IconDownload from "@tabler/icons-svelte/icons/download";
	import IconTrendingUp from "@tabler/icons-svelte/icons/trending-up";
	import IconStar from "@tabler/icons-svelte/icons/star";
	import IconSortAscending2 from "@tabler/icons-svelte/icons/sort-ascending-2";
	import IconSortDescending2 from "@tabler/icons-svelte/icons/sort-descending-2";

	import * as Button from "$lib/components/ui/button";
	import * as ToggleGroup from "$lib/components/ui/toggle-group";
	import * as Sheet from "$lib/components/ui/sheet";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import * as FloatingMenu from "$lib/components/ui/floating-menu";

	let {
		itemsPerPage = $bindable("20"),
		layout = $bindable("grid"),
		sortBy = $bindable("name"),
		sortOrder = $bindable("desc")
	}: FiltersProps = $props();
</script>

<FloatingMenu.Root>
	<FloatingMenu.Group>
		<ToggleGroup.Root type="single" variant="outline" bind:value={sortBy}>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<ToggleGroup.Item {...props} value="name" disabled={sortBy === "name"} aria-label="Sort the mods by name">
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
						<ToggleGroup.Item {...props} value="downloads" disabled={sortBy === "downloads"} aria-label="Sort the mods by downloads">
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
						<ToggleGroup.Item {...props} value="trending" disabled={sortBy === "trending"} aria-label="Sort the mods by trending">
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
						<ToggleGroup.Item {...props} value="follows" disabled={sortBy === "follows"} aria-label="Sort the mods by follows">
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
		<ToggleGroup.Root type="single" variant="outline" bind:value={sortOrder}>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<ToggleGroup.Item {...props} value="desc" disabled={sortOrder === "desc"} aria-label="Sort in descending order">
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
						<ToggleGroup.Item {...props} value="asc" disabled={sortOrder === "asc"} aria-label="Sort in ascending order">
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
		<ToggleGroup.Root type="single" variant="outline" bind:value={layout}>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<ToggleGroup.Item {...props} value="grid" disabled={layout === "grid"} aria-label="Change layout to grid">
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
						<ToggleGroup.Item {...props} value="list" disabled={layout === "list"} aria-label="Change layout to list">
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
		<ToggleGroup.Root type="single" variant="outline" bind:value={itemsPerPage}>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<ToggleGroup.Item {...props} value="20" disabled={itemsPerPage === "20"} aria-label="Show 20 items">20</ToggleGroup.Item>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Show 20 items</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<ToggleGroup.Item {...props} value="60" disabled={itemsPerPage === "60"} aria-label="Show 60 items">60</ToggleGroup.Item>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Show 60 items</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<ToggleGroup.Item {...props} value="100" disabled={itemsPerPage === "100"} aria-label="Show 100 items">100</ToggleGroup.Item>
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
