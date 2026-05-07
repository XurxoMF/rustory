<script lang="ts" module>
	export type SeparatorProps = Separator.RootProps;
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	import * as Separator from "$lib/components/ui/separator";

	let { ref = $bindable(null), class: className, ...restProps }: SeparatorProps = $props();
</script>

<div
	bind:this={ref}
	data-slot="field-separator"
	class={cn("relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2", className)}
	{...restProps}
>
	<Separator.Root class="absolute inset-0 top-1/2" />
</div>
