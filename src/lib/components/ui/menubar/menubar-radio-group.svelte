<script lang="ts" module>
	export type RadioGroupProps = MenubarPrimitive.RadioGroupProps;
</script>

<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";

	let { ref = $bindable(null), value = $bindable(""), ...restProps }: RadioGroupProps = $props();
</script>

<MenubarPrimitive.RadioGroup bind:ref bind:value data-slot="menubar-radio-group" {...restProps} />
