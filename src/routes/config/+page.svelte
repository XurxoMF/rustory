<script lang="ts">
  import i18n from "$i18n";

  import { setBreadcrumbs } from "$lib/ui/display/Breadcrumbs.svelte";

  setBreadcrumbs([{ label: $i18n.t("common.Config"), href: "/config" }]);
</script>

<p>Config Page!</p>
