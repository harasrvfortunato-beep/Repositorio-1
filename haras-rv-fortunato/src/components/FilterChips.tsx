type Props<T extends string> = {
  label: string;
  options: readonly T[];
  value: T | "Todos";
  onChange: (v: T | "Todos") => void;
};

/** Botões de filtro por categoria. */
export function FilterChips<T extends string>({ label, options, value, onChange }: Props<T>) {
  const all = ["Todos", ...options] as (T | "Todos")[];
  return (
    <div role="group" aria-label={label} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
      {all.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
              active ? "bg-musgo-700 text-areia-50" : "bg-areia-100 text-musgo-900 hover:bg-areia-200"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
