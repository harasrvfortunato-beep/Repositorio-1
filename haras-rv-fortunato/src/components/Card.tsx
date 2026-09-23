import type { ReactNode } from "react";
import { asset } from "../lib/asset";

type Props = {
  imagem: string;
  imagemAlt: string;
  children: ReactNode;
  selo?: string;
  aspecto?: string;
  className?: string;
};

/** Card base com foto no topo, usado em passeios, produtos e animais. */
export function Card({ imagem, imagemAlt, children, selo, aspecto = "aspect-[4/3]", className = "" }: Props) {
  return (
    <article className={`group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_1px_0_rgba(42,36,25,0.06),0_20px_40px_-24px_rgba(42,36,25,0.35)] ring-1 ring-areia-200 ${className}`}>
      <div className={`relative overflow-hidden ${aspecto}`}>
        <img
          src={asset(imagem)}
          alt={imagemAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {selo && (
          <span className="absolute top-4 left-4 rounded-full bg-dourado-500 px-3 py-1 text-xs font-semibold text-couro-900">
            {selo}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">{children}</div>
    </article>
  );
}
