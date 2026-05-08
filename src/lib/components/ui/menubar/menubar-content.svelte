<script lang="ts" module>
	export type ContentProps = WithoutChildrenOrChild<MenubarPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<Menubar.PortalProps> | undefined;
	};
</script>

<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";

	import { cn, type WithoutChildrenOrChild } from "$lib/utils";

	import * as Menubar from ".";

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 8,
		alignOffset = -4,
		align = "start",
		side = "bottom",
		portalProps,
		...restProps
	}: ContentProps = $props();
</script>

<Menubar.Portal {...portalProps}>
	<MenubarPrimitive.Content
		bind:ref
		data-slot="menubar-content"
		{align}
		{alignOffset}
		{side}
		{sideOffset}
		class={cn(
			"z-50 min-w-36 origin-(--bits-menubar-content-transform-origin) overflow-hidden rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
			className
		)}
		{...restProps}
	/>
</Menubar.Portal>
