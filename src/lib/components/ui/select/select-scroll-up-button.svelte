<script lang="ts" module>
	export type ScrollUpButtonProps = WithoutChildrenOrChild<SelectPrimitive.ScrollUpButtonProps>;
</script>

<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";

	import IconChevronUp from "@tabler/icons-svelte/icons/chevron-up";

	import { cn, type WithoutChildrenOrChild } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: ScrollUpButtonProps = $props();
</script>

<SelectPrimitive.ScrollUpButton
	bind:ref
	data-slot="select-scroll-up-button"
	class={cn("top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", className)}
	{...restProps}
>
	<IconChevronUp />
</SelectPrimitive.ScrollUpButton>
