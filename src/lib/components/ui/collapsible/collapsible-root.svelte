<script lang="ts" module>
	export type RootProps = CollapsiblePrimitive.RootProps;
</script>

<script lang="ts">
	import { Collapsible as CollapsiblePrimitive } from "bits-ui";

	let { ref = $bindable(null), open = $bindable(false), ...restProps }: RootProps = $props();
</script>

<CollapsiblePrimitive.Root bind:ref bind:open data-slot="collapsible" {...restProps} />
