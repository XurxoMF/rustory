<script lang="ts">
  import { goto, Router, type RouteConfig } from '@mateothegreat/svelte5-router'

  import Home from '@renderer/pages/Home.svelte'
  import Test from '@renderer/pages/Test.svelte'

  let count: number = $state(0)

  const routes: RouteConfig[] = [{ component: Home }, { path: '/test/(?<id>.*)', component: Test }]
</script>

<div class="bg-red-500 w-1/2">
  <h1>APP</h1>

  <button onclick={() => goto('/')}>INCIO</button>
  <button onclick={() => goto('/test/123')}>TEST</button>

  <button onclick={() => count++}>{count}</button>

  <Router {routes} />
</div>
