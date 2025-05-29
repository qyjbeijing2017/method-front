/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENTRY_POINT: string
  readonly VITE_FILE_PART_SIZE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}