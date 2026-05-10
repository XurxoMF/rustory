<script lang="ts" module>
	export type InputProps = { placeholder?: string | undefined; class?: string | undefined };
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	import * as Command from "$lib/components/ui/command";

	let { placeholder = "Buscar...", class: className }: InputProps = $props();
</script>

<Command.Input {placeholder} class={cn(className)} />
