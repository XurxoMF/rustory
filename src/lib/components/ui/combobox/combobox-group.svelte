<script lang="ts" module>
	export type GroupProps = {
		heading?: string | undefined;
		class?: string | undefined;
		children: Snippet;
	};
</script>

<script lang="ts">
	import type { Snippet } from "svelte";

	import { cn } from "$lib/utils";

	import * as Command from "$lib/components/ui/command";

	let { heading, class: className, children }: GroupProps = $props();
</script>

<Command.Group {heading} class={cn("scroll-my-1 p-1", className)}>
	{@render children()}
</Command.Group>
