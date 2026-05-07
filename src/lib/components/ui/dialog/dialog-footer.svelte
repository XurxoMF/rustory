<script lang="ts" module>
	export type FooterProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		showCloseButton?: boolean;
	};
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { Dialog as DialogPrimitive } from "bits-ui";

	import { cn, type WithElementRef } from "$lib/utils";

	import * as Button from "$lib/components/ui/button";

	let { ref = $bindable(null), class: className, children, showCloseButton = false, ...restProps }: FooterProps = $props();
</script>

<div
	bind:this={ref}
	data-slot="dialog-footer"
	class={cn("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end", className)}
	{...restProps}
>
	{@render children?.()}
	{#if showCloseButton}
		<DialogPrimitive.Close>
			{#snippet child({ props })}
				<Button.Root variant="outline" {...props}>Close</Button.Root>
			{/snippet}
		</DialogPrimitive.Close>
	{/if}
</div>
