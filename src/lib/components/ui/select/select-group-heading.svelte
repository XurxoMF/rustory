<script lang="ts" module>
	export type GroupHeadingProps = SelectPrimitive.GroupHeadingProps;
</script>

<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: GroupHeadingProps = $props();
</script>

<SelectPrimitive.GroupHeading
	bind:ref
	data-slot="select-group-heading"
	class={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</SelectPrimitive.GroupHeading>
