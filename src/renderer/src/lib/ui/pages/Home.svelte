<script lang="ts">
  import { Window } from '@renderer/lib/classes/Rustory'

  import PageWrapper from '@renderer/lib/ui/layout/PageWrapper.svelte'

  Window.instance.breadcrumbs.segments = []
</script>

<PageWrapper scrollable={false}>
  <div class="flex flex-col gap-2 flex-wrap">
    <p>Hola mundo!</p>
  </div>
</PageWrapper>
