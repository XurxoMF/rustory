<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import { ButtonTransparent } from "$lib/ui/form/Button";
  import Icon from "$lib/ui/base/Icon.svelte";
</script>

<ButtonTransparent
  rounded="circle"
  onclick={() => window.location.reload()}
  title={m.common__reload()}
>
  <Icon icon="ph:arrow-clockwise-bold" />
</ButtonTransparent>
<ButtonTransparent rounded="circle" onclick={() => history.back()} title={m.common__previous()}>
  <Icon icon="ph:caret-left-bold" />
</ButtonTransparent>
<ButtonTransparent rounded="circle" onclick={() => history.forward()} title={m.common__next()}>
  <Icon icon="ph:caret-right-bold" />
</ButtonTransparent>
