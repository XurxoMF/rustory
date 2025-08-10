<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import { route } from '@mateothegreat/svelte5-router'

  let open = $state(false)
</script>

<nav
  class={[
    'relative shrink-0 h-full flex flex-col p-2 items-center justify-between gap-2 overflow-hidden border-r transition-[width,border,background-color] duration-200',
    't-dark:bg-zinc-850 t-dark:border-r-zinc-750',
    't-light:bg-zinc-150 t-light:border-r-zinc-250',
    't-rust:bg-rust-850 t-rust:border-r-rust-750',
    't-midnight:bg-gray-850 t-midnight:border-r-gray-750',
    open ? 'w-60' : 'w-14'
  ]}
  onmouseenter={() => (open = true)}
  onmouseleave={() => (open = false)}
>
  <div class="w-full flex flex-col items-start justify-center gap-1">
    {@render MainNavButton('ph:house', m.common__home(), '/')}
    {@render MainNavButton('ph:gear', m.common__config(), '/config')}
  </div>
</nav>

{#snippet MainNavButton(icon: string, text: string, link: string = '/')}
  <a
    href={link}
    use:route={{
      active: { absolute: true, class: ['t-dark:bg-zinc-800', 't-light:bg-zinc-200', 't-rust:bg-rust-800', 't-midnight:bg-gray-800'] }
    }}
    class={[
      'relative w-full p-2 flex items-center gap-2 whitespace-nowrap cursor-pointer rounded-sm transition-[background-color] duration-200',
      't-dark:hover:bg-zinc-800',
      't-light:hover:bg-zinc-200',
      't-rust:hover:bg-rust-800',
      't-midnight:hover:bg-gray-800'
    ]}
  >
    <Icon {icon} class="shrink-0 text-2xl" />

    <p class={['text-start transition-opacity duration-200', open ? 'opacity-100' : 'opacity-0']}>
      {text}
    </p>
  </a>
{/snippet}
