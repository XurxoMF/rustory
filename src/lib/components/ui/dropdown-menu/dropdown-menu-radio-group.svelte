<script lang="ts" module>
	export type RadioGroupProps = DropdownMenuPrimitive.RadioGroupProps;
</script>

<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	let { ref = $bindable(null), value = $bindable(), ...restProps }: RadioGroupProps = $props();
</script>

<DropdownMenuPrimitive.RadioGroup bind:ref bind:value data-slot="dropdown-menu-radio-group" {...restProps} />
