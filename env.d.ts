/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_OPENWEATHER_API_KEY: string
  readonly VITE_OPENWEATHER_BASE_URL: string
  readonly VITE_GEOCODING_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
