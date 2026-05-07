<script lang="ts" module>
	export type InputProps = Input.RootProps;
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	import * as Input from "$lib/components/ui/input";

	let { ref = $bindable(null), value = $bindable(""), class: className, ...restProps }: InputProps = $props();
</script>

<Input.Root
	bind:ref
	bind:value
	data-slot="sidebar-input"
	data-sidebar="input"
	class={cn("h-8 w-full bg-background shadow-none", className)}
	{...restProps}
/>
