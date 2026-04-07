# Dev Notes

This are some notes contributors must know to understand how some things work or some changes made to some shadcn-svelte components and so on...

## shadcn-svelte

### Sidebar

- `sidebar.svelte`  
  Changed `h-svh` for `h-full` so it can fit inside containers and removed `fixed` so it doesn't position itself outside containers.

- `sidebar-provider.svelte`  
  Changed `min-h-svh` for `h-full` so it can fit inside containers.

### Sonner

- `sonner.svelte`  
  Changed `mode-watcher` for the `Config` class/store so it follows the theme of the configured theme.

- `index.ts`  
  Changed the exports so we can import both the `Toaster` and the `toatst()` from the same component
