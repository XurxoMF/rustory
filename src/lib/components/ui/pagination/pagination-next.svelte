<script lang="ts" module>
	export type NextProps = Pagination.LinkProps;
</script>

<script lang="ts">
	import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";

	import * as Pagination from ".";

	let { ...restProps }: NextProps = $props();
</script>

<Pagination.Link aria-label="Go to next page" {...restProps}>
	<span class="cn-pagination-next-text sr-only">Next</span>
	<IconChevronRight />
</Pagination.Link>
