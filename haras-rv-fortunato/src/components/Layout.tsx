import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { WhatsAppFloat } from "./WhatsAppFloat";

export function Layout() {
  const { pathname, hash } = useLocation();

  // Ao trocar de página, volta ao topo; se houver #âncora, rola até ela.
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
