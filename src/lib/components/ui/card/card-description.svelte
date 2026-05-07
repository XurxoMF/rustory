<script lang="ts" module>
	export type DescriptionProps = WithElementRef<HTMLAttributes<HTMLParagraphElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: DescriptionProps = $props();
</script>

<p bind:this={ref} data-slot="card-description" class={cn("text-sm text-muted-foreground", className)} {...restProps}>
	{@render children?.()}
</p>
