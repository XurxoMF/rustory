<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLHeadingElement>> = $props();
</script>

<h1
	class={cn('scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl', className)}
	bind:this={ref}
	{...restProps}
>
	{@render children?.()}
</h1>
