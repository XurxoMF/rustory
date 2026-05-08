<script lang="ts" module>
	export type ProviderProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		open?: boolean | undefined;
		onOpenChange?: ((open: boolean) => void) | undefined;
	};
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	import * as Sidebar from ".";

	let {
		ref = $bindable(null),
		open = $bindable(true),
		onOpenChange = () => {},
		class: className,
		style,
		children,
		...restProps
	}: ProviderProps = $props();

	const sidebar = Sidebar.setSidebar({
		open: () => open,
		setOpen: (value: boolean) => {
			open = value;
			onOpenChange(value);

			// This sets the cookie to keep the sidebar state.
			document.cookie = `${Sidebar.SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${Sidebar.SIDEBAR_COOKIE_MAX_AGE}`;
		}
	});
</script>

<svelte:window onkeydown={sidebar.handleShortcutKeydown} />

<div
	data-slot="sidebar-wrapper"
	style="--sidebar-width: {Sidebar.SIDEBAR_WIDTH}; --sidebar-width-icon: {Sidebar.SIDEBAR_WIDTH_ICON}; {style}"
	// Changed min-h-svh for h-full so it can fit inside containers
	class={cn("group/sidebar-wrapper flex h-full w-full has-data-[variant=inset]:bg-sidebar", className)}
	bind:this={ref}
	{...restProps}
>
	{@render children?.()}
</div>
