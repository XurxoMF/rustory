<script lang="ts" module>
	export type ToggleVariants = VariantProps<typeof Toggle.rootVariants>["variant"];
	export type ToggleSizes = VariantProps<typeof Toggle.rootVariants>["size"];

	export type ItemProps = ToggleGroupPrimitive.ItemProps & {
		variant?: ToggleVariants | undefined;
		size?: ToggleSizes | undefined;
	};
</script>

<script lang="ts">
	import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
	import type { VariantProps } from "tailwind-variants";

	import { cn } from "$lib/utils";

	import * as Toggle from "$lib/components/ui/toggle";

	import * as ToggleGroup from ".";

	let { ref = $bindable(null), value = $bindable(), class: className, size, variant, ...restProps }: ItemProps = $props();

	const ctx = ToggleGroup.getToggleGroupCtx();
</script>

<ToggleGroupPrimitive.Item
	bind:ref
	data-slot="toggle-group-item"
	data-variant={ctx.variant || variant}
	data-size={ctx.size || size}
	data-spacing={ctx.spacing}
	class={cn(
		"shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
		Toggle.rootVariants({
			variant: ctx.variant || variant,
			size: ctx.size || size
		}),
		className
	)}
	{value}
	{...restProps}
/>
