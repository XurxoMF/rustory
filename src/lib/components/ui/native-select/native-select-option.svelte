<script lang="ts" module>
	export type OptionProps = WithElementRef<HTMLOptionAttributes>;
</script>

<script lang="ts">
	import type { HTMLOptionAttributes } from "svelte/elements";

	import type { WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), children, ...restProps }: OptionProps = $props();
</script>

<option bind:this={ref} data-slot="native-select-option" {...restProps}>
	{@render children?.()}
</option>
