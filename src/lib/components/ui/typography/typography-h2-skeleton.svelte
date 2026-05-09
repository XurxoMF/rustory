<script lang="ts" module>
	export type H2SkeletonProps = Skeleton.RootProps;
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	import * as Skeleton from "$lib/components/ui/skeleton";

	let { class: className, ...restProps }: H2SkeletonProps = $props();

	let width = `${Math.floor(Math.random() * 60) + 40}%`;
</script>

<Skeleton.Root
	class={cn("my-0.5 h-8 w-(--skeleton-width) rounded-full not-first:mt-1", className)}
	style="--skeleton-width: {width};"
	{...restProps}
/>
