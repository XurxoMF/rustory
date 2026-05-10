<script lang="ts" module>
	export type RootProps<T extends ComboboxType> = {
		type?: T;
		value?: ValueMap[T] | undefined;
		onchange?: ((value: ValueMap[T]) => void) | undefined;
		children: Snippet;
	};
</script>

<script lang="ts" generics="T extends ComboboxType = 'single'">
	import { untrack, type Snippet } from "svelte";

	import * as Popover from "$lib/components/ui/popover";

	import { createComboboxContext, type ComboboxType, type ValueMap } from "./combobox-context.svelte";

	let { type = "single" as T, value = $bindable(), onchange, children }: RootProps<T> = $props();

	const ctx = createComboboxContext(
		() => value as ValueMap[T],
		(v) => {
			value = v;
			onchange?.(v);
		},
		untrack(() => type)
	);
</script>

<Popover.Root bind:open={ctx.open}>
	{@render children()}
</Popover.Root>
