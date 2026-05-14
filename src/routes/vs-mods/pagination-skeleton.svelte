<script lang="ts">
	import * as Pagination from "$lib/components/ui/pagination";
</script>

<Pagination.RootSkeleton>
	<Pagination.ContentSkeleton>
		{#each Array(9) as _, i (i)}
			<Pagination.ItemSkeleton>
				<Pagination.LinkSkeleton />
			</Pagination.ItemSkeleton>
		{/each}
	</Pagination.ContentSkeleton>
</Pagination.RootSkeleton>
