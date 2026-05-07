<script lang="ts" module>
	export type NextProps = Pagination.LinkProps;
</script>

<script lang="ts">
	import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";

	import { cn } from "$lib/utils";

	import * as Pagination from ".";

	let { class: className, ...restProps }: NextProps = $props();
</script>

<Pagination.Link aria-label="Go to next page" size="default" class={cn("pr-1.5!", className)} {...restProps}>
	<span class="cn-pagination-next-text hidden sm:block">Next</span>
	<IconChevronRight data-icon="inline-end" />
</Pagination.Link>
