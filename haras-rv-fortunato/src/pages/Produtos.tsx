import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { FilterChips } from "../components/FilterChips";
import { IconWhatsApp } from "../components/Icons";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { categoriasProdutos, produtos, type CategoriaProduto } from "../data/produtos";
import { linkWhatsApp } from "../data/site";
import { useSeo } from "../hooks/useSeo";
import { formatarPreco } from "../lib/format";

export default function Produtos() {
  useSeo({
    titulo: "Produtos do haras",
    descricao: "Selaria, alimentos caseiros e lembranças do Haras RV Fortunato. Compre direto pelo WhatsApp.",
    imagem: "/images/escolha-produtos.svg",
  });
  const [filtro, setFiltro] = useState<CategoriaProduto | "Todos">("Todos");
  const lista = filtro === "Todos" ? produtos : produtos.filter((p) => p.categoria === filtro);

  return (
    <>
      <PageHero
        eyebrow="Produtos"
        title="Um pedaço do haras para levar com você"
        text="Peças de selaria, delícias da roça e lembranças. Escolha o que gostou e fale com a gente pelo WhatsApp."
      >
        <FilterChips label="Filtrar produtos por categoria" options={categoriasProdutos} value={filtro} onChange={setFiltro} />
      </PageHero>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-live="polite">
        <p className="sr-only">{lista.length} produtos encontrados</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((p, i) => (
            <Reveal key={`${filtro}-${p.id}`} delay={(i % 3) * 90}>
              <Card imagem={p.imagem} imagemAlt={p.imagemAlt} aspecto="aspect-[4/3] sm:aspect-square" selo={p.categoria}>
                <h2 className="text-2xl font-semibold text-musgo-900">{p.nome}</h2>
                <p className="mt-2 text-sm leading-relaxed text-tinta/75">{p.descricao}</p>
                <p className="mt-4 font-serif text-3xl font-semibold text-couro-700">{formatarPreco(p.preco)}</p>
                <Button
                  href={linkWhatsApp(`Olá! Tenho interesse no produto ${p.nome}`)}
                  className="mt-6 w-full"
                  aria-label={`Comprar ${p.nome} pelo WhatsApp`}
                >
                  <IconWhatsApp className="h-5 w-5" />
                  Comprar pelo WhatsApp
                </Button>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
