<script lang="ts" module>
	export type ContentProps = TabsPrimitive.ContentProps;
</script>

<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: ContentProps = $props();
</script>

<TabsPrimitive.Content bind:ref data-slot="tabs-content" class={cn("flex-1 text-sm outline-none", className)} {...restProps} />
