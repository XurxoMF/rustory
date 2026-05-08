<script lang="ts" module>
	export type GroupProps = MenubarPrimitive.GroupProps & {
		inset?: boolean | undefined;
	};
</script>

<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: GroupProps = $props();
</script>

<MenubarPrimitive.Group bind:ref data-slot="menubar-group" {...restProps} />
