<script lang="ts" module>
	export type DescriptionSkeletonProps = Skeleton.RootProps;
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	import * as Skeleton from "$lib/components/ui/skeleton";

	let { ref = $bindable(null), class: className, ...restProps }: DescriptionSkeletonProps = $props();

	let width = `${Math.floor(Math.random() * 60) + 40}%`;
</script>

<Skeleton.Root
	class={cn("my-0.5 h-4.25 w-(--skeleton-width) rounded-full not-first:mt-1", className)}
	style="--skeleton-width: {width};"
	{ref}
	{...restProps}
/>
