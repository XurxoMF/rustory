<script lang="ts" module>
	export type CloseProps = PopoverPrimitive.CloseProps;
</script>

<script lang="ts">
	import { Popover as PopoverPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: CloseProps = $props();
</script>

<PopoverPrimitive.Close bind:ref data-slot="popover-close" {...restProps} />
