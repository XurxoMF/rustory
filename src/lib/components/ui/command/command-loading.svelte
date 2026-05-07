<script lang="ts" module>
	export type LoadingProps = CommandPrimitive.LoadingProps;
</script>

<script lang="ts">
	import { Command as CommandPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: LoadingProps = $props();
</script>

<CommandPrimitive.Loading bind:ref {...restProps} />
