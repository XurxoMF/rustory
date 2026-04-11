<script lang="ts">
	import * as AlertDialog from "$lib/components/ui/alert-dialog";

	import { Store } from "./Store.svelte";
</script>

{#if Store.instance.queue.length > 0}
	<AlertDialog.Root open={true}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>{Store.instance.queue[0].title}</AlertDialog.Title>
				<AlertDialog.Description>
					{Store.instance.queue[0].description}
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel onclick={() => Store.instance.oncancel(Store.instance.queue[0])}>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action onclick={() => Store.instance.onaccept(Store.instance.queue[0])} variant={Store.instance.queue[0].mode}>
					Accept
				</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}
