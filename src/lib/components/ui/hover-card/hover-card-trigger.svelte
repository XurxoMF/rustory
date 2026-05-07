<script lang="ts" module>
	export type TriggerProps = HoverCardPrimitive.TriggerProps;
</script>

<script lang="ts">
	import { LinkPreview as HoverCardPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: TriggerProps = $props();
</script>

<HoverCardPrimitive.Trigger bind:ref data-slot="hover-card-trigger" {...restProps} />
