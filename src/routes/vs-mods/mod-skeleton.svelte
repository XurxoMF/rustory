<script lang="ts" module>
	export type ModSkeletonProps = {
		layout: Layout;
	};
</script>

<script lang="ts">
	import * as Skeleton from "$lib/components/ui/skeleton";

	import { type Layout } from "./filters.svelte";

	let { layout }: ModSkeletonProps = $props();
</script>

{#if layout === "grid"}
	<Skeleton.Root class="h-124 w-full rounded-xl" />
{:else}
	<Skeleton.Root class="h-24 w-full rounded-lg" />
{/if}
