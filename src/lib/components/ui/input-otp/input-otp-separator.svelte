<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { WithElementRef } from "$lib/utils.js";
	import { cn } from "$lib/utils.js";
	import { IconMinus } from "@tabler/icons-svelte";

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="input-otp-separator"
	role="separator"
	class={cn("flex items-center [&_svg:not([class*='size-'])]:size-4", className)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		<IconMinus />
	{/if}
</div>
