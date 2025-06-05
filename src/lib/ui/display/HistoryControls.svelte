<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import { Window } from "$lib/classes/Rustory";

  import { ButtonUnstyled } from "$lib/ui/form/Buttons";
  import Icon from "$lib/ui/base/Icon.svelte";
</script>

<ButtonUnstyled icon onclick={() => Window.instance.executeOnReload()} title={m.common__reload()}>
  <Icon icon="ph:arrow-clockwise-bold" />
</ButtonUnstyled>
<ButtonUnstyled icon onclick={() => history.back()} title={m.common__previous()}>
  <Icon icon="ph:caret-left-bold" />
</ButtonUnstyled>
<ButtonUnstyled icon onclick={() => history.forward()} title={m.common__next()}>
  <Icon icon="ph:caret-right-bold" />
</ButtonUnstyled>
