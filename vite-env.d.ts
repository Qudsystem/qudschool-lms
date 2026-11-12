/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_GA4_ID?: string;
  readonly VITE_GA4_DEBUG?: string;
  readonly VITE_GSC_VERIFICATION?: string;
  readonly VITE_BING_VERIFICATION?: string;
  readonly VITE_YANDEX_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
