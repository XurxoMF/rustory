<script lang="ts">
  import i18n from "$i18n";

  import { setBreadcrumbs } from "$modules/layout/stores/BreadcrumbsStore.svelte";

  setBreadcrumbs([{ label: $i18n.t("common.Config"), href: "/config" }]);
</script>

<p>Config Page!</p>
