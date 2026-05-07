<script lang="ts" module>
	export type ItemProps = WithElementRef<HTMLLiAttributes>;
</script>

<script lang="ts">
	import type { HTMLLiAttributes } from "svelte/elements";

	import type { WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), children, ...restProps }: ItemProps = $props();
</script>

<li bind:this={ref} data-slot="pagination-item" {...restProps}>
	{@render children?.()}
</li>
