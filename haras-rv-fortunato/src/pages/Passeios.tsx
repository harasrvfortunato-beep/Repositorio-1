import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { IconClock, IconUser, IconUsers } from "../components/Icons";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { passeios } from "../data/passeios";
import { site } from "../data/site";
import { useSeo } from "../hooks/useSeo";
import { formatarPreco } from "../lib/format";

export default function Passeios() {
  useSeo({
    titulo: "Passeios a cavalo",
    descricao: "Passeios a cavalo guiados entre as árvores. Veja duração, valores, idade mínima e vagas por horário e agende o seu.",
    imagem: "/images/passeio-guiado.svg",
  });

  return (
    <>
      <PageHero
        eyebrow="Passeios"
        title="Trilhas a cavalo no ritmo do campo"
        text="Todos os passeios são guiados por gente do haras. Escolha o seu e reserve o horário com sinal de 50% no Pix."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {passeios.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <Card imagem={p.imagem} imagemAlt={p.imagemAlt} selo={p.destaque}>
                <h2 className="text-3xl font-semibold text-musgo-900">{p.nome}</h2>
                <p className="mt-2 text-sm leading-relaxed text-tinta/75">{p.descricao}</p>
                <dl className="mt-6 grid grid-cols-3 gap-2 border-y border-areia-200 py-4 text-sm">
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs text-tinta/60"><IconClock className="h-4 w-4" />Duração</dt>
                    <dd className="mt-1 font-semibold text-musgo-900">{p.duracao}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs text-tinta/60"><IconUser className="h-4 w-4" />Idade</dt>
                    <dd className="mt-1 font-semibold text-musgo-900">{p.idadeMinima}+ anos</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs text-tinta/60"><IconUsers className="h-4 w-4" />Vagas</dt>
                    <dd className="mt-1 font-semibold text-musgo-900">{p.vagas} por horário</dd>
                  </div>
                </dl>
                <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                  <p>
                    <span className="block font-serif text-4xl font-semibold text-couro-700">{formatarPreco(p.valor)}</span>
                    <span className="text-xs text-tinta/60">por pessoa</span>
                  </p>
                  <Button href={site.linkAgendar} aria-label={`Agendar ${p.nome}`}>
                    Agendar
                  </Button>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
