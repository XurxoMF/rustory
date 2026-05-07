<script lang="ts" module>
	export type SeparatorProps = DropdownMenuPrimitive.SeparatorProps;
</script>

<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: SeparatorProps = $props();
</script>

<DropdownMenuPrimitive.Separator bind:ref data-slot="dropdown-menu-separator" class={cn("-mx-1 my-1 h-px bg-border", className)} {...restProps} />
