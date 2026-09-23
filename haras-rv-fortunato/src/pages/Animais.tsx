import { useState } from "react";
import { Card } from "../components/Card";
import { FilterChips } from "../components/FilterChips";
import { IconArrow } from "../components/Icons";
import { Modal } from "../components/Modal";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { animais, tiposAnimais, type Animal, type TipoAnimal } from "../data/animais";
import { useSeo } from "../hooks/useSeo";

export default function Animais() {
  useSeo({
    titulo: "Nossos animais",
    descricao: "Conheça os cavalos, pôneis e outros animais do Haras RV Fortunato: raça, idade e o jeitinho de cada um.",
    imagem: "/images/escolha-animais.svg",
  });
  const [filtro, setFiltro] = useState<TipoAnimal | "Todos">("Todos");
  const [aberto, setAberto] = useState<Animal | null>(null);
  const lista = filtro === "Todos" ? animais : animais.filter((a) => a.tipo === filtro);

  return (
    <>
      <PageHero
        eyebrow="Animais"
        title="A turma que faz o haras"
        text="Cada um tem nome, história e personalidade. Clique para ver mais fotos e detalhes."
      >
        <FilterChips label="Filtrar animais por tipo" options={tiposAnimais} value={filtro} onChange={setFiltro} />
      </PageHero>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-live="polite">
        <p className="sr-only">{lista.length} animais encontrados</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((a, i) => (
            <Reveal key={`${filtro}-${a.id}`} delay={(i % 3) * 90}>
              <Card imagem={a.fotos[0].src} imagemAlt={a.fotos[0].alt} selo={a.tipo} className="relative cursor-pointer">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-3xl font-semibold text-musgo-900">{a.nome}</h2>
                  <span className="text-sm text-tinta/60">{a.idade}</span>
                </div>
                <p className="text-sm font-medium text-couro-700">{a.raca}</p>
                <p className="mt-3 text-sm leading-relaxed text-tinta/75 italic">“{a.curiosidade}”</p>
                <button
                  type="button"
                  onClick={() => setAberto(a)}
                  aria-label={`Ver mais fotos e detalhes de ${a.nome}`}
                  className="mt-auto inline-flex items-center gap-2 self-start pt-5 text-sm font-semibold text-musgo-700 after:absolute after:inset-0 after:rounded-[1.75rem] after:content-['']"
                >
                  Ver mais
                  <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <Modal open={!!aberto} onClose={() => setAberto(null)} labelledBy="animal-titulo">
        {aberto && <DetalheAnimal animal={aberto} />}
      </Modal>
    </>
  );
}

function DetalheAnimal({ animal }: { animal: Animal }) {
  const [foto, setFoto] = useState(0);
  const atual = animal.fotos[foto];
  return (
    <div className="grid md:grid-cols-[1.3fr_1fr]">
      <div className="bg-areia-100 p-3 sm:p-4">
        <img src={atual.src} alt={atual.alt} className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" />
        <div className="mt-3 flex gap-3" role="group" aria-label="Escolher foto">
          {animal.fotos.map((f, i) => (
            <button
              key={f.src}
              type="button"
              onClick={() => setFoto(i)}
              aria-label={`Mostrar foto ${i + 1}`}
              aria-pressed={i === foto}
              className={`overflow-hidden rounded-xl ring-2 transition ${i === foto ? "ring-dourado-500" : "opacity-70 ring-transparent hover:opacity-100"}`}
            >
              <img src={f.src} alt="" className="h-16 w-20 object-cover sm:h-20 sm:w-24" />
            </button>
          ))}
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <p className="text-xs font-semibold tracking-[0.25em] text-couro-700 uppercase">{animal.tipo}</p>
        <h2 id="animal-titulo" className="mt-2 text-5xl font-semibold text-musgo-900">{animal.nome}</h2>
        <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-areia-100 p-4 text-sm">
          <div>
            <dt className="text-tinta/60">Raça</dt>
            <dd className="font-semibold text-musgo-900">{animal.raca}</dd>
          </div>
          <div>
            <dt className="text-tinta/60">Idade</dt>
            <dd className="font-semibold text-musgo-900">{animal.idade}</dd>
          </div>
        </dl>
        <p className="mt-6 leading-relaxed text-tinta/80">{animal.descricao}</p>
        <p className="mt-4 border-l-2 border-dourado-500 pl-4 font-serif text-xl text-couro-700 italic">{animal.curiosidade}</p>
      </div>
    </div>
  );
}
