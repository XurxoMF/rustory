<script lang="ts" module>
	export type ContentProps = WithoutChild<AlertDialogPrimitive.ContentProps> & {
		size?: "default" | "sm" | undefined;
		portalProps?: WithoutChildrenOrChild<Dialog.PortalProps> | undefined;
	};
</script>

<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";

	import { cn, type WithoutChild, type WithoutChildrenOrChild } from "$lib/utils";

	import * as Dialog from ".";

	let { ref = $bindable(null), class: className, size = "default", portalProps, ...restProps }: ContentProps = $props();
</script>

<Dialog.Portal {...portalProps}>
	<Dialog.Overlay />
	<AlertDialogPrimitive.Content
		bind:ref
		data-slot="alert-dialog-content"
		data-size={size}
		class={cn(
			"group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
			className
		)}
		{...restProps}
	/>
</Dialog.Portal>
