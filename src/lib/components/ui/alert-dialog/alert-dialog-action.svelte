<script lang="ts" module>
	export type ActionProps = AlertDialogPrimitive.ActionProps & {
		variant?: Button.RootVariants;
		size?: Button.RootSizes;
	};
</script>

<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	import * as Button from "$lib/components/ui/button";

	let { ref = $bindable(null), class: className, variant = "default", size = "default", ...restProps }: ActionProps = $props();
</script>

<AlertDialogPrimitive.Action
	bind:ref
	data-slot="alert-dialog-action"
	class={cn(Button.rootVariants({ variant, size }), "cn-alert-dialog-action", className)}
	{...restProps}
/>
