<script lang="ts" module>
	export type ShortcutProps = WithElementRef<HTMLAttributes<HTMLSpanElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: ShortcutProps = $props();
</script>

<span
	bind:this={ref}
	data-slot="menubar-shortcut"
	class={cn("ml-auto text-xs tracking-widest text-muted-foreground group-focus/menubar-item:text-accent-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</span>
