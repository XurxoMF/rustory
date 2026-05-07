<script lang="ts" module>
	export type FallbackProps = AvatarPrimitive.FallbackProps;
</script>

<script lang="ts">
	import { Avatar as AvatarPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: FallbackProps = $props();
</script>

<AvatarPrimitive.Fallback
	bind:ref
	data-slot="avatar-fallback"
	class={cn(
		"flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
		className
	)}
	{...restProps}
/>
