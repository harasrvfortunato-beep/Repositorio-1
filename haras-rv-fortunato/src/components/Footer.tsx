import { Link } from "react-router-dom";
import { linkWhatsApp, site } from "../data/site";
import { menu } from "./Header";
import { IconFacebook, IconInstagram, IconMap, IconWhatsApp } from "./Icons";
import { Logo } from "./Logo";

export function Footer() {
  const redes = [
    { nome: "Instagram", url: site.redes.instagram, Icon: IconInstagram },
    { nome: "Facebook", url: site.redes.facebook, Icon: IconFacebook },
  ].filter((r) => r.url);

  return (
    <footer id="contato" className="scroll-mt-24 bg-musgo-900 text-areia-100">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-areia-100/75">{site.descricao}</p>
          <div className="mt-6 flex gap-3">
            {redes.map(({ nome, url, Icon }) => (
              <a
                key={nome}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.nome} no ${nome}`}
                className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-areia-50/20 transition-colors hover:bg-areia-50/10 hover:text-dourado-300"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="font-serif text-xl text-dourado-300">Navegue</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {menu.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-areia-100/80 hover:text-areia-50">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-serif text-xl text-dourado-300">Fale com a gente</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-areia-100/80 hover:text-areia-50">
                <IconWhatsApp className="h-5 w-5 text-dourado-300" />
                WhatsApp {site.whatsappExibicao}
              </a>
            </li>
            <li>
              <a href={site.linkMapa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-areia-100/80 hover:text-areia-50">
                <IconMap className="h-5 w-5 text-dourado-300" />
                Ver localização no mapa
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-areia-50/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-areia-100/60 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {site.nome}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
