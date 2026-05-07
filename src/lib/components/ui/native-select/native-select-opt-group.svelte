<script lang="ts" module>
	export type OptGroupProps = WithElementRef<HTMLOptgroupAttributes>;
</script>

<script lang="ts">
	import type { HTMLOptgroupAttributes } from "svelte/elements";

	import type { WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), children, ...restProps }: OptGroupProps = $props();
</script>

<optgroup bind:this={ref} data-slot="native-select-opt-group" {...restProps}>
	{@render children?.()}
</optgroup>
