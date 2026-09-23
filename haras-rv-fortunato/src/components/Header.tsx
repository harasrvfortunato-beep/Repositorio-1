import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { site } from "../data/site";
import { Button } from "./Button";
import { IconClose, IconMenu } from "./Icons";
import { Logo } from "./Logo";

export const menu = [
  { label: "Início", to: "/" },
  { label: "Passeios", to: "/passeios" },
  { label: "Produtos", to: "/produtos" },
  { label: "Animais", to: "/animais" },
  { label: "Contato", to: "/#contato" },
];

export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Na Home, o header começa transparente sobre a foto do topo.
  const overHero = pathname === "/" && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        overHero ? "bg-transparent py-5" : "bg-areia-50/90 py-3 shadow-[0_1px_0_rgba(42,36,25,0.08)] backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo light={overHero} />

        <nav aria-label="Menu principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {menu.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      overHero
                        ? "text-areia-50 hover:bg-areia-50/10"
                        : isActive && !item.to.includes("#")
                          ? "bg-musgo-50 text-musgo-900"
                          : "text-tinta/80 hover:text-musgo-900"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button href={site.linkAgendar} variant="gold" className="hidden !px-5 !py-2.5 sm:inline-flex">
            Agendar
          </Button>
          <button
            type="button"
            className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${overHero ? "text-areia-50 ring-1 ring-areia-50/30" : "text-musgo-900 ring-1 ring-musgo-700/20"}`}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="mx-4 mt-3 rounded-3xl bg-white p-3 shadow-xl ring-1 ring-areia-200 lg:hidden"
      >
        <ul className="flex flex-col">
          {menu.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 font-serif text-2xl text-musgo-900 hover:bg-areia-100"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Button href={site.linkAgendar} variant="gold" className="mt-2 w-full">
          Agendar passeio
        </Button>
      </div>
    </header>
  );
}
