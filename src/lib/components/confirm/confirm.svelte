<script lang="ts">
	import { App } from "$lib/classes/App.svelte";

	import * as AlertDialog from "$lib/components/ui/alert-dialog";
</script>

{#if App.confirm.queue.length > 0}
	<AlertDialog.Root open={true}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>{App.confirm.queue[0].title}</AlertDialog.Title>
				<AlertDialog.Description>
					{App.confirm.queue[0].description}
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel onclick={() => App.confirm.oncancel(App.confirm.queue[0])}>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action onclick={() => App.confirm.onaccept(App.confirm.queue[0])} variant={App.confirm.queue[0].mode}>Accept</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}
