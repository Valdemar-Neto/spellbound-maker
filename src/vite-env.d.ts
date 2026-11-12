/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Endpoint (Cloudflare Worker) que recebe o pedido deixado com a loja fechada. */
  readonly VITE_PEDIDO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
