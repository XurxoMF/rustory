<script lang="ts" module>
	export type DialogProps = WithoutChildrenOrChild<DialogPrimitive.RootProps> &
		WithoutChildrenOrChild<CommandPrimitive.RootProps> & {
			portalProps?: DialogPrimitive.PortalProps | undefined;
			children: Snippet | undefined;
			title?: string | undefined;
			description?: string | undefined;
			showCloseButton?: boolean | undefined;
			class?: string | undefined;
		};
</script>

<script lang="ts">
	import type { Command as CommandPrimitive, Dialog as DialogPrimitive } from "bits-ui";
	import type { Snippet } from "svelte";

	import { cn, type WithoutChildrenOrChild } from "$lib/utils";

	import * as Dialog from "$lib/components/ui/dialog";

	import * as Command from ".";

	let {
		open = $bindable(false),
		ref = $bindable(null),
		value = $bindable(""),
		title = "Command Palette",
		description = "Search for a command to run...",
		showCloseButton = false,
		portalProps,
		children,
		class: className,
		...restProps
	}: DialogProps = $props();
</script>

<Dialog.Root bind:open {...restProps}>
	<Dialog.Header class="sr-only">
		<Dialog.Title>{title}</Dialog.Title>
		<Dialog.Description>{description}</Dialog.Description>
	</Dialog.Header>
	<Dialog.Content class={cn("top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0", className)} {showCloseButton} {portalProps}>
		<Command.Root {...restProps} bind:value bind:ref {children} />
	</Dialog.Content>
</Dialog.Root>
