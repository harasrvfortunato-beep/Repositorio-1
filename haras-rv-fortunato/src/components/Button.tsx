import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "gold" | "outline" | "ghost-light";

const styles: Record<Variant, string> = {
  primary: "bg-musgo-700 text-areia-50 hover:bg-musgo-900",
  gold: "bg-dourado-500 text-couro-900 hover:bg-dourado-300",
  outline: "border border-musgo-700/30 text-musgo-900 hover:border-musgo-700 hover:bg-musgo-50",
  "ghost-light": "border border-areia-50/40 text-areia-50 hover:bg-areia-50/10",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  to?: string;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/** Botão-link. Use `to` para páginas do site e `href` para links externos. */
export function Button({ children, variant = "primary", href, to, className = "", ...rest }: Props) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-300 ${styles[variant]} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
      {children}
    </a>
  );
}
