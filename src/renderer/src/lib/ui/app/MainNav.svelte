<script lang="ts">
  import { route } from '@mateothegreat/svelte5-router'

  import { m } from '@renderer/paraglide/messages'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'

  let open = $state(false)
</script>

<nav
  class={[
    'relative shrink-0 h-full flex flex-col p-2 items-center justify-between gap-2 overflow-hidden border-r transition-[width,border,background-color] duration-200',
    't-dark:bg-zinc-850 t-dark:border-r-zinc-750',
    't-light:bg-zinc-100 t-light:border-r-zinc-300',
    't-rust:bg-rust-850 t-rust:border-r-rust-750',
    't-midnight:bg-gray-850 t-midnight:border-r-gray-750',
    open ? 'w-60' : 'w-14'
  ]}
  onmouseenter={() => (open = true)}
  onmouseleave={() => (open = false)}
>
  <div class="w-full h-full flex flex-col items-start justify-between gap-2">
    <div class="w-full flex flex-col items-start justify-between gap-2">
      {@render MainNavButton('ph:house-bold', m.common__home(), '/')}
      {@render MainNavButton('ph:git-fork-bold', m.vintagestory__versions(), '/vs/versions')}
    </div>

    <div class="w-full flex flex-col items-start justify-between gap-2">
      {@render MainNavButton('ph:gear-bold', m.common__config(), '/config')}
    </div>
  </div>
</nav>

{#snippet MainNavButton(icon: string, text: string, link: string = '/')}
  <a
    href={link}
    use:route={{
      active: { absolute: true, class: ['t-dark:bg-zinc-750', 't-light:bg-zinc-300', 't-rust:bg-rust-750', 't-midnight:bg-gray-750'] }
    }}
    class={[
      'relative w-full p-2 flex items-center gap-2 whitespace-nowrap rounded-md transition-[opacity,background-color] duration-200',
      'focus-visible:outline-2',
      'cursor-pointer disabled:cursor-not-allowed',
      'disabled:opacity-40',
      't-dark:hover:bg-zinc-800 t-dark:focus-visible:outline-zinc-750',
      't-light:hover:bg-zinc-200 t-light:focus-visible:outline-zinc-300',
      't-rust:hover:bg-rust-800 t-rust:focus-visible:outline-rust-750',
      't-midnight:hover:bg-gray-800 t-midnight:focus-visible:outline-gray-750'
    ]}
  >
    <Icon {icon} class="shrink-0 text-2xl" />

    <span class={['text-start transition-opacity duration-200', open ? 'opacity-100' : 'opacity-0']}>
      {text}
    </span>
  </a>
{/snippet}
