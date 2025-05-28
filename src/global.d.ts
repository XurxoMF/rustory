/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_DEV: boolean;
    readonly VITE_RUSTORY_API: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
