<script lang="ts" module>
	export type H1SkeletonProps = Skeleton.RootProps;
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	import * as Skeleton from "$lib/components/ui/skeleton";

	let { class: className, ...restProps }: H1SkeletonProps = $props();

	let width = `${Math.floor(Math.random() * 60) + 40}%`;
</script>

<Skeleton.Root
	class={cn("my-0.5 h-8 w-(--skeleton-width) rounded-full not-first:mt-1 lg:h-11", className)}
	style="--skeleton-width: {width};"
	{...restProps}
/>
