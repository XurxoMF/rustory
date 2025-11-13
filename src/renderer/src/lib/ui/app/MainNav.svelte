<script lang="ts">
  import { route } from '@mateothegreat/svelte5-router'

  import { m } from '@renderer/paraglide/messages'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'

  let open = $state(false)
  let fixed = $state(false)
</script>

<nav
  class={[
    'relative shrink-0 h-full flex flex-col p-2 items-center gap-2 overflow-hidden border-r shadow/20 transition-[width,border,background-color] duration-200',
    't-dark:bg-zinc-850 t-dark:border-r-zinc-750',
    't-light:bg-zinc-100 t-light:border-r-zinc-300',
    't-rust:bg-rust-850 t-rust:border-r-rust-750',
    't-midnight:bg-gray-850 t-midnight:border-r-gray-750',
    open ? 'w-52' : 'w-11'
  ]}
  onmouseenter={() => {
    if (!fixed) open = true
  }}
  onmouseleave={() => {
    if (!fixed) open = false
  }}
>
  <div class={['absolute top-2.5 right-2.5 z-1 transition-opacity duration-200', !open ? 'opacity-0' : 'opacity-100']}>
    <Button tabindex={!open ? -1 : undefined} onclick={() => (fixed = !fixed)}>
      <Icon icon={fixed ? 'ph:push-pin-slash' : 'ph:push-pin'} />
    </Button>
  </div>

  <div class="w-full h-full flex flex-col items-start justify-between gap-2">
    <div class="w-full flex flex-col items-start justify-between gap-2">
      {@render NavLink('ph:house', m.common__home(), '/')}
      {@render NavLink('ph:git-fork', m.vintagestory__versions(), '/vs/versions')}
    </div>

    <div class="w-full flex flex-col items-start justify-between gap-2">
      {@render NavLink('ph:gear', m.common__config(), '/config')}
    </div>
  </div>
</nav>

{#snippet NavLink(icon: string, text: string, link: string = '/')}
  <a
    href={link}
    use:route={{
      active: { absolute: true, class: ['t-dark:bg-zinc-750', 't-light:bg-zinc-300', 't-rust:bg-rust-750', 't-midnight:bg-gray-750'] }
    }}
    class={[
      'relative h-7 w-full flex items-center justify-start gap-1 whitespace-nowrap p-1 border-0 rounded-md transition-[opacity,background-color] duration-200',
      'focus-visible:outline-2',
      'cursor-pointer disabled:cursor-not-allowed',
      'disabled:opacity-40',
      't-dark:hover:bg-zinc-800 t-dark:focus-visible:outline-zinc-750',
      't-light:hover:bg-zinc-200 t-light:focus-visible:outline-zinc-300',
      't-rust:hover:bg-rust-800 t-rust:focus-visible:outline-rust-750',
      't-midnight:hover:bg-gray-800 t-midnight:focus-visible:outline-gray-750'
    ]}
  >
    <Icon {icon} class="shrink-0 p-0.5" />

    <span class={['text-start text-sm transition-opacity duration-200', !open ? 'opacity-0' : 'opacity-100']}>
      {text}
    </span>
  </a>
{/snippet}
