<script lang="ts" module>
	export type MenuProps = MenubarPrimitive.MenuProps;
</script>

<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";

	let { ...restProps }: MenuProps = $props();
</script>

<MenubarPrimitive.Menu {...restProps} />
