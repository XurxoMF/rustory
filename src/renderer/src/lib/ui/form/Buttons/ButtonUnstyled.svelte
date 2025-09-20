<script lang="ts">
  import { type Snippet } from 'svelte'
  import { type HTMLButtonAttributes } from 'svelte/elements'

  type ButtonUnstyledPropsType = Omit<HTMLButtonAttributes, 'class'> & {
    children: Snippet<[]>
    icon?: boolean | undefined
  }

  let { children, icon = false, ...restProps }: ButtonUnstyledPropsType = $props()
</script>

<button class={['w-fit flex items-center justify-center enabled:cursor-pointer p-1 disabled:opacity-50 transition-[opacity] duration-200', icon ? 'p-1' : 'px-2 py-1']} {...restProps}>
  {@render children()}
</button>
