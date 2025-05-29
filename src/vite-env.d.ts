/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENTRY_POINT: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}