<script lang="ts" module>
	export type ContentProps = WithoutChild<SelectPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<Select.PortalProps> | undefined;
	};
</script>

<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";

	import { cn, type WithoutChild, type WithoutChildrenOrChild } from "$lib/utils";

	import * as Select from ".";

	let { ref = $bindable(null), class: className, sideOffset = 4, portalProps, children, preventScroll = true, ...restProps }: ContentProps = $props();
</script>

<Select.Portal {...portalProps}>
	<SelectPrimitive.Content
		bind:ref
		{sideOffset}
		{preventScroll}
		data-slot="select-content"
		class={cn(
			"relative isolate z-50 min-w-36 overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
			className
		)}
		{...restProps}
	>
		<Select.ScrollUpButton />

		<SelectPrimitive.Viewport class={cn("h-(--bits-select-anchor-height) w-full min-w-(--bits-select-anchor-width) scroll-my-1")}>
			{@render children?.()}
		</SelectPrimitive.Viewport>

		<Select.ScrollDownButton />
	</SelectPrimitive.Content>
</Select.Portal>
