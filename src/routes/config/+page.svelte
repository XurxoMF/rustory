<script lang="ts">
  import { rustory } from "$lib/stores/rustory";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";
  import ThemeSelector from "$lib/ui/settings/Theme.svelte";
  import CollapsibleSection from "$lib/ui/layout/CollapsibleSection.svelte";
  import ButtonTransparent from "$lib/ui/form/Button/ButtonTransparent.svelte";

  rustory.mainWindow.breadcrumbs.segments = [{ label: "common.Config", href: "/config" }];
</script>

<PageWrapper scrollable={false}>
  <div class="w-full h-full p-2">
    <CollapsibleSection>
      {#snippet title()}
        <h2 class="font-bold">Settings</h2>
      {/snippet}

      {#snippet content()}
        <div class="flex flex-col gap-2">
          <div class="w-full flex items-center justify-start flex-wrap gap-2">
            <p>Theme</p>
            <ThemeSelector />
          </div>

          <div class="w-full flex items-center justify-start flex-wrap gap-2">
            <p>Language</p>
            <!-- TODO: paraglide -->
            <!-- {#each getLanguages() as language}
              <ButtonTransparent onclick={() => (rustory.config.lang = language.code)}>
                <p>{`${language.name} · ${language.credits}`}</p>
              </ButtonTransparent>
            {/each} -->
          </div>
        </div>
      {/snippet}
    </CollapsibleSection>
  </div>
</PageWrapper>
