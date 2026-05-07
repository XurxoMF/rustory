<script lang="ts" module>
	export type TitleProps = DrawerPrimitive.TitleProps;
</script>

<script lang="ts">
	import { Drawer as DrawerPrimitive } from "vaul-svelte";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: TitleProps = $props();
</script>

<DrawerPrimitive.Title bind:ref data-slot="drawer-title" class={cn("text-base font-medium text-foreground", className)} {...restProps} />
