<script lang="ts" module>
	export type TextareaProps = Textarea.RootProps;
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	import * as Textarea from "$lib/components/ui/textarea";

	let { ref = $bindable(null), value = $bindable(), class: className, ...props }: TextareaProps = $props();
</script>

<Textarea.Root
	bind:ref
	data-slot="input-group-control"
	class={cn(
		"flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
		className
	)}
	bind:value
	{...props}
/>
