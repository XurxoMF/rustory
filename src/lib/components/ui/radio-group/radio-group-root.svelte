<script lang="ts" module>
	export type RootProps = RadioGroupPrimitive.RootProps;
</script>

<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, value = $bindable(""), ...restProps }: RootProps = $props();
</script>

<RadioGroupPrimitive.Root bind:ref bind:value data-slot="radio-group" class={cn("grid w-full gap-2", className)} {...restProps} />
