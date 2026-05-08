<script lang="ts" module>
	export type PrevButtonProps = RangeCalendarPrimitive.PrevButtonProps & {
		variant?: Button.RootVariants | undefined;
	};
</script>

<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";

	import ChevronLeftIcon from "@tabler/icons-svelte/icons/chevron-left";

	import { cn } from "$lib/utils";

	import * as Button from "$lib/components/ui/button";

	let { ref = $bindable(null), class: className, children, variant = "ghost", ...restProps }: PrevButtonProps = $props();
</script>

{#snippet Fallback()}
	<ChevronLeftIcon class="size-4" />
{/snippet}

<RangeCalendarPrimitive.PrevButton
	bind:ref
	class={cn(Button.rootVariants({ variant }), "size-(--cell-size) bg-transparent p-0 select-none disabled:opacity-50 rtl:rotate-180", className)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		{@render Fallback()}
	{/if}
</RangeCalendarPrimitive.PrevButton>
