<script lang="ts" module>
	export type RootProps = HoverCardPrimitive.RootProps;
</script>

<script lang="ts">
	import { LinkPreview as HoverCardPrimitive } from "bits-ui";

	let { open = $bindable(false), ...restProps }: RootProps = $props();
</script>

<HoverCardPrimitive.Root bind:open {...restProps} />
