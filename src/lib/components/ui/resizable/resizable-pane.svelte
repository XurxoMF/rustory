<script lang="ts" module>
	export type PaneProps = ResizablePrimitive.PaneProps;
</script>

<script lang="ts">
	import * as ResizablePrimitive from "paneforge";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: PaneProps = $props();
</script>

<ResizablePrimitive.Pane bind:ref data-slot="resizable-pane" class={cn("cn-resizable-pane flex-1 overflow-hidden", className)} {...restProps} />
