<script lang="ts" module>
	export const buttonVariants = tv({
		base: "gap-2 text-sm flex items-center shadow-none",
		variants: {
			size: {
				xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
				sm: "cn-input-group-button-size-sm",
				"icon-xs": "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
				"icon-sm": "size-8 p-0 has-[>svg]:p-0"
			}
		},
		defaultVariants: {
			size: "xs"
		}
	});

	export type ButtonSizes = VariantProps<typeof buttonVariants>["size"];

	export type ButtonProps = Omit<Button.RootProps, "href" | "size"> & {
		size?: ButtonSizes | undefined;
	};
</script>

<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	import { cn } from "$lib/utils";

	import * as Button from "$lib/components/ui/button";

	let { ref = $bindable(null), class: className, children, type = "button", variant = "ghost", size = "xs", ...restProps }: ButtonProps = $props();
</script>

<Button.Root bind:ref {type} data-size={size} {variant} class={cn(buttonVariants({ size }), className)} {...restProps}>
	{@render children?.()}
</Button.Root>
