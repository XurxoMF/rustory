<script lang="ts">
  import i18n from "$i18n";

  import Button from "$modules/basics/components/Button.svelte";
  import Icon from "$modules/basics/components/Icon.svelte";

  import { setBreadcrumbs } from "$modules/layout/stores/BreadcrumbsStore.svelte";

  setBreadcrumbs([{ label: $i18n.t("common.Config"), href: "/config" }]);
</script>

<p>Config Page!</p>
