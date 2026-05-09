<script lang="ts" module>
	export type TriggerSkeletonProps = Skeleton.RootProps;
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	import * as Skeleton from "$lib/components/ui/skeleton";

	let { class: className, ...restProps }: TriggerSkeletonProps = $props();

	const width = `${Math.floor(Math.random() * 5) + 5}rem`;
</script>

<Skeleton.Root
	class={cn(
		"inline-flex h-[calc(100%-1px)] min-w-(--skeleton-width) flex-1 rounded-md group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start",
		className
	)}
	style="--skeleton-width: {width};"
	{...restProps}
/>
