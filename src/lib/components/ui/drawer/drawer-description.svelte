<script lang="ts" module>
	export type DescriptionProps = DrawerPrimitive.DescriptionProps;
</script>

<script lang="ts">
	import { Drawer as DrawerPrimitive } from "vaul-svelte";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: DescriptionProps = $props();
</script>

<DrawerPrimitive.Description bind:ref data-slot="drawer-description" class={cn("text-sm text-muted-foreground", className)} {...restProps} />
