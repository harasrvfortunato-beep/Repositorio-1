declare global {
  interface Window {
    __ASSETS__?: Record<string, string>;
  }
}

/** Caminho de uma imagem. Na prévia empacotada (arquivo único), usa a versão embutida. */
export const asset = (path: string) => window.__ASSETS__?.[path] ?? path;
