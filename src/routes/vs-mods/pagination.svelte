<script lang="ts" module>
	export type PaginationProps = {
		count: number;
		itemsPerPage: number;
		currentPage: number;
	};
</script>

<script lang="ts">
	import { App } from "$lib/classes/App.svelte";

	import * as Pagination from "$lib/components/ui/pagination";

	let { count, itemsPerPage, currentPage = $bindable(1), ...restProps }: PaginationProps = $props();
</script>

<Pagination.Root
	{count}
	perPage={itemsPerPage}
	bind:page={currentPage}
	onPageChange={() => App.UI.contentRef?.scrollTo({ top: 0, behavior: "instant" })}
	{...restProps}
>
	{#snippet children({ pages, currentPage })}
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.Previous />
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
				<Pagination.Next />
			</Pagination.Item>
		</Pagination.Content>
	{/snippet}
</Pagination.Root>
