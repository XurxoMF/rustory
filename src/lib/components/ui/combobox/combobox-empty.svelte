<script lang="ts" module>
	export type EmptyProps = {
		class?: string | undefined;
		children: Snippet;
	};
</script>

<script lang="ts">
	import type { Snippet } from "svelte";

	import { cn } from "$lib/utils";

	import * as Command from "$lib/components/ui/command";

	let { class: className, children }: EmptyProps = $props();
</script>

<Command.Empty class={cn(className)}>{@render children()}</Command.Empty>
