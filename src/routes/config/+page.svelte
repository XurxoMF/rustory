<script lang="ts">
  import i18n from "$i18n";

  import { breadcrumbs } from "$modules/layout/stores/Breadcrumbs";

  breadcrumbs.set([
    { label: "/", href: "/" },
    { label: $i18n.t("common.Config"), href: "/config" },
  ]);
</script>

<p>Config Page!</p>
