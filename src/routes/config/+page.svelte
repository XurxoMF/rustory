<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import { localesMeta } from "$lib/i18n/localesMeta";

  import { rustory } from "$lib/stores/rustory";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";
  import ThemeSelector from "$lib/ui/settings/Theme.svelte";
  import CollapsibleSection from "$lib/ui/layout/CollapsibleSection.svelte";
  import ButtonTransparent from "$lib/ui/form/Button/ButtonTransparent.svelte";

  rustory.mainWindow.breadcrumbs.segments = [{ label: m.common__config(), href: "/config" }];
</script>

<PageWrapper scrollable={false}>
  <div class="w-full h-full p-2">
    <CollapsibleSection buttonText="Settings" open>
      <div class="flex flex-col gap-2">
        <div class="w-full flex items-center justify-start flex-wrap gap-2">
          <p>Theme</p>
          <ThemeSelector />
        </div>

        <div class="w-full flex items-center justify-start flex-wrap gap-2">
          <p>Language</p>
          {#each localesMeta as locale}
            <ButtonTransparent onclick={() => (rustory.config.lang = locale.locale)}>
              <p>{`${locale.name} · ${locale.credits.join(", ")}`}</p>
            </ButtonTransparent>
          {/each}
        </div>
      </div>
    </CollapsibleSection>
  </div>
</PageWrapper>
