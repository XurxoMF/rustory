<script lang="ts">
	import type { HTMLBlockquoteAttributes } from 'svelte/elements';

	import { cn, type WithElementRef } from '$lib/utils.js';

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<HTMLBlockquoteAttributes> = $props();
</script>

<blockquote class={cn('border-s-2 ps-6 italic', className)} bind:this={ref} {...restProps}>
	{@render children?.()}
</blockquote>
