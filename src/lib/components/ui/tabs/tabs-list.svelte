<script lang="ts" module>
	export const listVariants = tv({
		base: "rounded-lg p-[3px] gap-1 group-data-horizontal/tabs:h-8 data-[variant=line]:rounded-none group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
		variants: {
			variant: {
				default: "cn-tabs-list-variant-default bg-muted",
				line: "cn-tabs-list-variant-line gap-1 bg-transparent"
			}
		},
		defaultVariants: {
			variant: "default"
		}
	});

	export type ListVariants = VariantProps<typeof listVariants>["variant"];

	export type ListProps = TabsPrimitive.ListProps & {
		variant?: ListVariants;
	};
</script>

<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import { Tabs as TabsPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), variant = "default", class: className, ...restProps }: ListProps = $props();
</script>

<TabsPrimitive.List bind:ref data-slot="tabs-list" data-variant={variant} class={cn(listVariants({ variant }), className)} {...restProps} />
