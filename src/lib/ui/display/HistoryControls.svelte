<script lang="ts">
  import i18n from "$i18n";

  import { ButtonTransparent } from "$lib/ui/form/Button";
  import Icon from "$lib/ui/base/Icon.svelte";
</script>

<ButtonTransparent
  rounded="circle"
  onclick={() => window.location.reload()}
  title={$i18n.t("common.Reload")}
>
  <Icon icon="ph:arrow-clockwise-bold" />
</ButtonTransparent>
<ButtonTransparent
  rounded="circle"
  onclick={() => history.back()}
  title={$i18n.t("common.Previous")}
>
  <Icon icon="ph:caret-left-bold" />
</ButtonTransparent>
<ButtonTransparent
  rounded="circle"
  onclick={() => history.forward()}
  title={$i18n.t("common.Next")}
>
  <Icon icon="ph:caret-right-bold" />
</ButtonTransparent>
