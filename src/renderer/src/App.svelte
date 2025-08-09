<script lang="ts">
  import { route, Router, type RouteConfig } from '@mateothegreat/svelte5-router'

  import Home from '@renderer/pages/Home.svelte'
  import Test from '@renderer/pages/Test.svelte'

  let count: number = $state(0)

  const routes: RouteConfig[] = [{ component: Home }, { path: '/test/(?<id>.*)', component: Test }]
</script>

<div class="bg-red-500 w-1/2">
  <h1>APP</h1>

  <a href="/" use:route={{ active: { absolute: true, class: 'text-white' } }}>INCIO</a>
  <a href="/test/123" use:route={{ active: { absolute: true, class: 'text-white' } }}>TEST</a>

  <button onclick={() => count++}>{`Total: ${count}`}</button>

  <Router {routes} />
</div>
