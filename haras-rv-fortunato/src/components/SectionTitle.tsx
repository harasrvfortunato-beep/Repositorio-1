type Props = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
};

export function SectionTitle({ eyebrow, title, text, align = "left", tone = "dark", as: H = "h2" }: Props) {
  const center = align === "center";
  const light = tone === "light";
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] ${light ? "text-dourado-300" : "text-couro-700"} ${center ? "justify-center" : ""}`}>
          <span className={`h-px w-8 ${light ? "bg-dourado-300" : "bg-couro-500"}`} aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <H className={`text-4xl leading-[1.05] font-semibold sm:text-5xl ${light ? "text-areia-50" : "text-musgo-900"}`}>{title}</H>
      {text && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? "text-areia-100/85" : "text-tinta/75"}`}>{text}</p>}
    </div>
  );
}
