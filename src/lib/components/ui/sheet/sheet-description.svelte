<script lang="ts" module>
	export type DescriptionProps = SheetPrimitive.DescriptionProps;
</script>

<script lang="ts">
	import { Dialog as SheetPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: DescriptionProps = $props();
</script>

<SheetPrimitive.Description bind:ref data-slot="sheet-description" class={cn("text-sm text-muted-foreground", className)} {...restProps} />
