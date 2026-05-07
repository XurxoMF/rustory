<script lang="ts" module>
	export type RootProps = MenubarPrimitive.RootProps;
</script>

<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: RootProps = $props();
</script>

<MenubarPrimitive.Root bind:ref data-slot="menubar" class={cn("flex h-8 items-center gap-0.5 rounded-lg border p-0.75", className)} {...restProps} />
