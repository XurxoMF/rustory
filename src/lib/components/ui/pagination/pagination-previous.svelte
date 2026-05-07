<script lang="ts" module>
	export type PreviousProps = Pagination.LinkProps;
</script>

<script lang="ts">
	import IconChevronLeft from "@tabler/icons-svelte/icons/chevron-left";

	import { cn } from "$lib/utils";

	import * as Pagination from ".";

	let { class: className, ...restProps }: PreviousProps = $props();
</script>

<Pagination.Link aria-label="Go to previous page" size="default" class={cn("pr-1.5!", className)} {...restProps}>
	<span class="cn-pagination-previous-text hidden sm:block">Previous</span>
	<IconChevronLeft data-icon="inline-start" />
</Pagination.Link>
