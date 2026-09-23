import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { IconArrow, IconMap } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { SectionTitle } from "../components/SectionTitle";
import { destaques, passos, site } from "../data/site";
import { useSeo } from "../hooks/useSeo";

const escolhas = [
  {
    to: "/passeios",
    emoji: "🐎",
    titulo: "Passeios",
    texto: "Passeios a cavalo guiados entre as árvores",
    imagem: "/images/escolha-passeios.svg",
    alt: "Cavaleiro em trilha de terra no campo",
  },
  {
    to: "/produtos",
    emoji: "🛍️",
    titulo: "Produtos",
    texto: "Produtos do haras para você levar para casa",
    imagem: "/images/escolha-produtos.svg",
    alt: "Sela de couro sobre fundo cor de areia",
  },
  {
    to: "/animais",
    emoji: "🐴",
    titulo: "Animais",
    texto: "Conheça nossos cavalos e animais",
    imagem: "/images/escolha-animais.svg",
    alt: "Cavalo e potro no pasto",
  },
];

export default function Home() {
  useSeo({});

  return (
    <>
      {/* 1. Hero */}
      <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden rounded-b-[2.5rem] sm:rounded-b-[4rem]">
        <img
          src="/images/hero.svg"
          alt="Cavaleiro montado em um cavalo em uma trilha de terra entre árvores"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-musgo-900/90 via-musgo-900/40 to-musgo-900/10" aria-hidden="true" />
        <div className="mx-auto w-full max-w-7xl px-4 pt-32 pb-16 sm:px-6 sm:pb-24 lg:px-8">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-areia-50/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-dourado-300 ring-1 ring-areia-50/20 backdrop-blur">
              Haras RV Fortunato
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="max-w-3xl text-6xl leading-[0.95] font-semibold text-areia-50 sm:text-7xl lg:text-8xl">
              Viva o campo <em className="font-medium text-dourado-300">de perto</em>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-areia-100/90">
              Trilhas a cavalo entre as árvores, com guia, calma e muito verde ao redor.
            </p>
          </Reveal>
          <Reveal delay={300} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={site.linkAgendar} variant="gold" className="!px-8 !py-4 text-base">
              Agendar passeio
            </Button>
            <Button to="/passeios" variant="ghost-light" className="!px-8 !py-4 text-base">
              Ver passeios
            </Button>
          </Reveal>
        </div>
      </section>

      {/* 3. Escolha */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8" aria-labelledby="escolha-titulo">
        <Reveal>
          <div id="escolha-titulo">
            <SectionTitle eyebrow="Por onde começar" title="O que você quer viver hoje?" align="center" />
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {escolhas.map((c, i) => (
            <Reveal key={c.to} delay={i * 120}>
              <Link
                to={c.to}
                className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[2rem] p-7 sm:aspect-[3/4] md:aspect-[3/4.4]"
              >
                <img src={c.imagem} alt={c.alt} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-couro-900/90 via-couro-900/30 to-transparent" aria-hidden="true" />
                <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-areia-50/90 text-3xl" aria-hidden="true">
                  {c.emoji}
                </span>
                <h3 className="text-4xl font-semibold text-areia-50">{c.titulo}</h3>
                <p className="mt-2 max-w-xs text-areia-100/90">{c.texto}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-dourado-300">
                  Conhecer
                  <IconArrow className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. Destaques */}
      <section aria-label="Destaques do passeio" className="px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-7xl rounded-[2rem] bg-musgo-700 px-6 py-10 sm:px-12 sm:py-12">
          <ul className="grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:divide-x lg:divide-areia-50/15">
            {destaques.map((d) => (
              <li key={d.rotulo} className="text-center">
                <p className="font-serif text-5xl font-semibold text-dourado-300 sm:text-6xl">{d.valor}</p>
                <p className="mt-1 text-sm tracking-wide text-areia-100/85 uppercase">{d.rotulo}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* 5. Como funciona */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal>
            <SectionTitle
              eyebrow="Como funciona"
              title="Três passos até a trilha"
              text="Reservar é simples. Você garante a vaga com um sinal e acerta o restante quando chegar."
            />
            <Button href={site.linkAgendar} className="mt-8">
              Ver horários livres
            </Button>
          </Reveal>
          <ol className="relative space-y-6">
            {passos.map((p, i) => (
              <Reveal as="li" key={p.titulo} delay={i * 120} className="flex gap-6 rounded-[1.75rem] bg-areia-100 p-6 sm:p-8">
                <span className="font-serif text-6xl leading-none font-semibold text-couro-500" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-musgo-900 sm:text-3xl">
                    <span className="sr-only">Passo {i + 1}: </span>
                    {p.titulo}
                  </h3>
                  <p className="mt-2 leading-relaxed text-tinta/75">{p.texto}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Como chegar */}
      <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 overflow-hidden rounded-[2.5rem] bg-areia-100 lg:grid-cols-2">
          <Reveal className="h-full">
            <img
              src="/images/como-chegar.svg"
              alt="Estrada de terra entre árvores levando até o haras"
              loading="lazy"
              className="h-72 w-full object-cover sm:h-96 lg:h-full lg:min-h-[28rem]"
            />
          </Reveal>
          <Reveal delay={120} className="px-6 pb-10 sm:px-10 lg:py-14 lg:pr-14 lg:pl-0">
            <SectionTitle eyebrow="Como chegar" title="A porteira está te esperando" text={site.comoChegar} />
            <Button href={site.linkMapa} className="mt-8">
              <IconMap className="h-5 w-5" />
              Ver no mapa
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
