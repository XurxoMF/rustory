<script lang="ts">
  import { ButtonTransparent } from "$lib/ui/form/Button";
  import Icon from "$lib/ui/base/Icon.svelte";
</script>

<!-- TODO: paraglide -->
<ButtonTransparent
  rounded="circle"
  onclick={() => window.location.reload()}
  title={"common.Reload"}
>
  <Icon icon="ph:arrow-clockwise-bold" />
</ButtonTransparent>
<ButtonTransparent rounded="circle" onclick={() => history.back()} title={"common.Previous"}>
  <Icon icon="ph:caret-left-bold" />
</ButtonTransparent>
<ButtonTransparent rounded="circle" onclick={() => history.forward()} title={"common.Next"}>
  <Icon icon="ph:caret-right-bold" />
</ButtonTransparent>
