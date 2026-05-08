<script lang="ts" module>
	export const rootVariants = tv({
		base: "data-[invalid=true]:text-destructive gap-2 group/field flex w-full",
		variants: {
			orientation: {
				vertical: "cn-field-orientation-vertical flex-col [&>*]:w-full [&>.sr-only]:w-auto",
				horizontal:
					"cn-field-orientation-horizontal flex-row items-center has-[>[data-slot=field-content]]:items-start [&>[data-slot=field-label]]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
				responsive:
					"cn-field-orientation-responsive flex-col @md/field-group:flex-row @md/field-group:items-center @md/field-group:has-[>[data-slot=field-content]]:items-start [&>*]:w-full @md/field-group:[&>*]:w-auto [&>.sr-only]:w-auto @md/field-group:[&>[data-slot=field-label]]:flex-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
			}
		},
		defaultVariants: {
			orientation: "vertical"
		}
	});

	export type RootOrientations = VariantProps<typeof rootVariants>["orientation"];

	export type RootProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		orientation?: RootOrientations | undefined;
	};
</script>

<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, orientation = "vertical", children, ...restProps }: RootProps = $props();
</script>

<div
	bind:this={ref}
	role="group"
	data-slot="field"
	data-orientation={orientation}
	class={cn(rootVariants({ orientation }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
