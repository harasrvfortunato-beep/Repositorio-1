import { Link } from "react-router-dom";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Haras RV Fortunato, página inicial">
      <span className={`grid h-10 w-10 place-items-center rounded-full font-serif text-lg font-bold ${light ? "bg-areia-50/15 text-dourado-300 ring-1 ring-areia-50/30" : "bg-musgo-700 text-dourado-300"}`} aria-hidden="true">
        RV
      </span>
      <span className="leading-none">
        <span className={`block text-[0.65rem] font-semibold uppercase tracking-[0.3em] ${light ? "text-areia-100/80" : "text-couro-700"}`}>Haras</span>
        <span className={`block font-serif text-xl font-semibold ${light ? "text-areia-50" : "text-musgo-900"}`}>RV Fortunato</span>
      </span>
    </Link>
  );
}
