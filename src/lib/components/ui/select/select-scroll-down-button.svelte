<script lang="ts" module>
	export type ScrollDownButtonProps = WithoutChildrenOrChild<SelectPrimitive.ScrollDownButtonProps>;
</script>

<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";

	import IconChevronDown from "@tabler/icons-svelte/icons/chevron-down";

	import { cn, type WithoutChildrenOrChild } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: ScrollDownButtonProps = $props();
</script>

<SelectPrimitive.ScrollDownButton
	bind:ref
	data-slot="select-scroll-down-button"
	class={cn("bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", className)}
	{...restProps}
>
	<IconChevronDown />
</SelectPrimitive.ScrollDownButton>
