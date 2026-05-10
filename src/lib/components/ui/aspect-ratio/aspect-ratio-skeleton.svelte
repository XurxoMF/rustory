<script lang="ts" module>
	export type SkeletonProps = WithoutChildrenOrChild<AspectRatioPrimitive.RootProps>;
</script>

<script lang="ts">
	import { AspectRatio as AspectRatioPrimitive } from "bits-ui";

	import type { WithoutChildrenOrChild } from "$lib/utils";

	import * as Skeleton from "$lib/components/ui/skeleton";

	let { ref = $bindable(null), ...restProps }: SkeletonProps = $props();
</script>

<AspectRatioPrimitive.Root bind:ref data-slot="aspect-ratio" {...restProps}>
	<Skeleton.Root class="h-full w-full rounded-none" />
</AspectRatioPrimitive.Root>
