<script lang="ts" module>
	export type SkeletonProps = Skeleton.RootProps;
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	import * as Skeleton from "$lib/components/ui/skeleton";

	let { ref = $bindable(null), class: className, ...restProps }: SkeletonProps = $props();
</script>

<Skeleton.Root class={cn("h-8 w-full rounded-lg", className)} {ref} {...restProps} />
