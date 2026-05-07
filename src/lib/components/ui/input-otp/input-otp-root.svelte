<script lang="ts" module>
	export type RootProps = InputOTPPrimitive.RootProps;
</script>

<script lang="ts">
	import { PinInput as InputOTPPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, value = $bindable(""), ...restProps }: RootProps = $props();
</script>

<InputOTPPrimitive.Root
	bind:ref
	bind:value
	data-slot="input-otp"
	spellcheck={false}
	class={cn("cn-input-otp-input flex items-center gap-2 disabled:cursor-not-allowed has-disabled:opacity-50", className)}
	{...restProps}
/>
