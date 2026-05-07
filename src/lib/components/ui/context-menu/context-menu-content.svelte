<script lang="ts" module>
	export type ContentProps = ContextMenuPrimitive.ContentProps & {
		portalProps?: WithoutChildrenOrChild<ContextMenu.PortalProps>;
	};
</script>

<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "bits-ui";

	import { cn, type WithoutChildrenOrChild } from "$lib/utils";

	import * as ContextMenu from ".";

	let { ref = $bindable(null), portalProps, class: className, ...restProps }: ContentProps = $props();
</script>

<ContextMenu.Portal {...portalProps}>
	<ContextMenuPrimitive.Content
		bind:ref
		data-slot="context-menu-content"
		class={cn(
			"z-50 min-w-36 overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
			className
		)}
		{...restProps}
	/>
</ContextMenu.Portal>
