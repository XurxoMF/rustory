<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<code
	class={cn(
		'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
		className
	)}
	bind:this={ref}
	{...restProps}
>
	{@render children?.()}
</code>
