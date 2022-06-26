/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URI: string
  readonly VITE_API_ACCESS_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}