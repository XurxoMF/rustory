<script lang="ts">
	import type { PageLoadError } from "$lib/classes/errors/PageLoadError.svelte";

	import { P } from "$lib/components/ui/typography";

	let { err }: { err: PageLoadError } = $props();
</script>

<P>{err.message}</P>
