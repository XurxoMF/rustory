<script lang="ts" module>
	export type TriggerProps = DrawerPrimitive.TriggerProps;
</script>

<script lang="ts">
	import { Drawer as DrawerPrimitive } from "vaul-svelte";

	let { ref = $bindable(null), ...restProps }: TriggerProps = $props();
</script>

<DrawerPrimitive.Trigger bind:ref data-slot="drawer-trigger" {...restProps} />
