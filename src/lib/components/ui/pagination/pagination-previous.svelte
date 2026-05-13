<script lang="ts" module>
	export type PreviousProps = Pagination.LinkProps;
</script>

<script lang="ts">
	import IconChevronLeft from "@tabler/icons-svelte/icons/chevron-left";

	import * as Pagination from ".";

	let { ...restProps }: PreviousProps = $props();
</script>

<Pagination.Link aria-label="Go to previous page" {...restProps}>
	<span class="cn-pagination-previous-text sr-only">Previous</span>
	<IconChevronLeft />
</Pagination.Link>
