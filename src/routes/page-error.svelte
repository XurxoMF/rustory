<script lang="ts" module>
	export type ErrorProps = PageProps & {
		err: PageLoadError;
	};
</script>

<script lang="ts">
	import { type PageProps } from "./$types";

	import type { PageLoadError } from "$lib/classes/errors/PageLoadError.svelte";

	import { P } from "$lib/components/ui/typography";

	let { err }: ErrorProps = $props();
</script>

<P>{err.message}</P>
