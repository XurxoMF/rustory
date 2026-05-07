<script lang="ts" module>
	export type RootProps = SelectPrimitive.RootProps;
</script>

<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";

	let { open = $bindable(false), value = $bindable(), ...restProps }: RootProps = $props();
</script>

<SelectPrimitive.Root bind:open bind:value={value as never} {...restProps} />
