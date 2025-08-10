/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEV: boolean
  readonly VITE_RUSTORY_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
