import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

type Props = { eyebrow: string; title: string; text: string; children?: ReactNode };

/** Topo das páginas internas (Passeios, Produtos, Animais). */
export function PageHero({ eyebrow, title, text, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-areia-100 pt-32 pb-14 sm:pt-40 sm:pb-20">
      <svg className="pointer-events-none absolute -right-20 -bottom-10 h-72 w-[40rem] text-areia-200" viewBox="0 0 600 200" aria-hidden="true">
        <path d="M0 200 C 120 90 240 150 360 80 C 450 30 530 60 600 40 L 600 200 Z" fill="currentColor" />
      </svg>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle as="h1" eyebrow={eyebrow} title={title} text={text} />
        </Reveal>
        {children && <Reveal delay={120} className="mt-8">{children}</Reveal>}
      </div>
    </section>
  );
}
