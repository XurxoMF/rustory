<script lang="ts" module>
	export type SubProps = MenubarPrimitive.SubProps;
</script>

<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";

	let { open = $bindable(false), ...restProps }: SubProps = $props();
</script>

<MenubarPrimitive.Sub bind:open {...restProps} />
