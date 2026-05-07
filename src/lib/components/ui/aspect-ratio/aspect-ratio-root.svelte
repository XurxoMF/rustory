<script lang="ts" module>
	export type RootProps = AspectRatioPrimitive.RootProps;
</script>

<script lang="ts">
	import { AspectRatio as AspectRatioPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: RootProps = $props();
</script>

<AspectRatioPrimitive.Root bind:ref data-slot="aspect-ratio" {...restProps} />
