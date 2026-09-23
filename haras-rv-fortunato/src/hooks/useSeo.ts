import { useEffect } from "react";
import { site } from "../data/site";

type Seo = { titulo?: string; descricao?: string; imagem?: string };

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/** Define título, descrição e Open Graph da página atual. */
export function useSeo({ titulo, descricao = site.descricao, imagem = "/images/og-cover.svg" }: Seo) {
  useEffect(() => {
    const title = titulo ? `${titulo} | ${site.nome}` : `${site.nome} | ${site.slogan}`;
    const url = window.location.origin + window.location.pathname;
    const img = new URL(imagem, window.location.origin).href;
    document.title = title;
    setMeta("name", "description", descricao);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", descricao);
    setMeta("property", "og:image", img);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:card", "summary_large_image");
  }, [titulo, descricao, imagem]);
}
