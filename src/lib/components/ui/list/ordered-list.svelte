<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn, type WithElementRef } from '$lib/utils.js';

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<HTMLAttributes<HTMLOListElement>> = $props();
</script>

<ol class={cn('ms-6 list-decimal [&>li]:mt-2', className)} bind:this={ref} {...restProps}>
	{@render children?.()}
</ol>
