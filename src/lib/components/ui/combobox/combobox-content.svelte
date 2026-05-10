<script lang="ts" module>
	export type ContentProps = {
		class?: string | undefined;
		children: Snippet;
	};
</script>

<script lang="ts">
	import type { Snippet } from "svelte";

	import { cn } from "$lib/utils";

	import * as Popover from "$lib/components/ui/popover";
	import * as Command from "$lib/components/ui/command";

	let { class: className, children }: ContentProps = $props();
</script>

<Popover.Content
	data-slot="combobox-content"
	class={cn(
		"relative isolate z-50 w-(--bits-popover-anchor-width) min-w-36 scroll-my-1 overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-0 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
		className
	)}
>
	<Command.Root class="w-full">
		{@render children()}
	</Command.Root>
</Popover.Content>
