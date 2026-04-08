<script lang="ts">
	import * as AlertDialog from "$lib/components/ui/alert-dialog";

	import { ConfirmStore } from "./ConfirmStore.svelte";
</script>

{#if ConfirmStore.instance.queue.length > 0}
	<AlertDialog.Root open={true}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>{ConfirmStore.instance.queue[0].title}</AlertDialog.Title>
				<AlertDialog.Description>
					{ConfirmStore.instance.queue[0].description}
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel onclick={() => ConfirmStore.instance.oncancel(ConfirmStore.instance.queue[0])}>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action
					onclick={() => ConfirmStore.instance.onaccept(ConfirmStore.instance.queue[0])}
					variant={ConfirmStore.instance.queue[0].mode}
				>
					Accept
				</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}
