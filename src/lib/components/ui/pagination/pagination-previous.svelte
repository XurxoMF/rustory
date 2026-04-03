<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { cn } from "$lib/utils.js";
	import { PaginationLink } from "./index.js";
	import { IconChevronLeft } from "@tabler/icons-svelte";

	type PaginationPreviousProps = ComponentProps<typeof PaginationLink>;

	let { class: className, ...restProps }: PaginationPreviousProps = $props();
</script>

<PaginationLink aria-label="Go to previous page" size="default" class={cn("pl-1.5!", className)} {...restProps}>
	<IconChevronLeft data-icon="inline-start" />
	<span class="cn-pagination-previous-text hidden sm:block">Previous</span>
</PaginationLink>
