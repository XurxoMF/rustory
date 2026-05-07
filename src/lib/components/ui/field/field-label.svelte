<script lang="ts" module>
	export type LabelProps = Label.RootProps;
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	import * as Label from "$lib/components/ui/label";

	let { ref = $bindable(null), class: className, children, ...restProps }: LabelProps = $props();
</script>

<Label.Root
	bind:ref
	data-slot="field-label"
	class={cn(
		"group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10",
		"has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</Label.Root>
