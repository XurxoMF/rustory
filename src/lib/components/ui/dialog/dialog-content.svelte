<script lang="ts" module>
	export type ContentProps = WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<Dialog.PortalProps>;
		children: Snippet;
		showCloseButton?: boolean;
	};
</script>

<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import type { Snippet } from "svelte";

	import IconX from "@tabler/icons-svelte/icons/x";

	import { cn, type WithoutChildrenOrChild } from "$lib/utils";

	import * as Button from "$lib/components/ui/button";

	import * as Dialog from ".";

	let { ref = $bindable(null), class: className, portalProps, children, showCloseButton = true, ...restProps }: ContentProps = $props();
</script>

<Dialog.Portal {...portalProps}>
	<Dialog.Overlay />
	<DialogPrimitive.Content
		bind:ref
		data-slot="dialog-content"
		class={cn(
			"fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		{#if showCloseButton}
			<DialogPrimitive.Close data-slot="dialog-close">
				{#snippet child({ props })}
					<Button.Root variant="ghost" class="absolute top-2 right-2" size="icon-sm" {...props}>
						<IconX />
						<span class="sr-only">Close</span>
					</Button.Root>
				{/snippet}
			</DialogPrimitive.Close>
		{/if}
	</DialogPrimitive.Content>
</Dialog.Portal>
