<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import { rustory } from "$lib/stores/rustory";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";
  import ThemeSelector from "$lib/ui/settings/Theme.svelte";
  import Select, { type SelectItemType } from "$lib/ui/form/Select.svelte";
  import { RustoryConfig } from "$lib/classes/RustoryConfig.svelte";

  rustory.mainWindow.breadcrumbs.segments = [{ label: m.common__config(), href: "/config" }];

  let langs: SelectItemType[] = RustoryConfig.LANGUAGES_DATA.map((lang) => ({
    value: lang.lang,
    label: lang.name,
  }));
  let lang: string | undefined = rustory.config.lang;
</script>

<PageWrapper scrollable={true}>
  <div class="flex flex-col gap-2">
    <div class="w-full flex items-center justify-start flex-wrap gap-2">
      <p>{m.settings__theme()}</p>
      <ThemeSelector />
    </div>

    <div class="w-full flex items-center justify-start gap-2">
      <p>{m.settings__language()}</p>
      <Select
        placeholder={m.placeholders__select_one()}
        items={langs}
        bind:value={lang}
        onValueChange={(e) => {
          if (e !== undefined) rustory.config.lang = e;
        }}
      />
    </div>
  </div>
</PageWrapper>
