import { linkWhatsApp, site } from "../data/site";
import { IconWhatsApp } from "./Icons";

export function WhatsAppFloat() {
  return (
    <a
      href={linkWhatsApp(`Olá! Vim pelo site do ${site.nome}.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="fixed right-4 bottom-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#1f8f4e] text-white shadow-[0_12px_30px_-8px_rgba(31,143,78,0.7)] transition-transform duration-300 hover:scale-105 sm:right-6 sm:bottom-6 sm:h-16 sm:w-16"
    >
      <IconWhatsApp className="h-7 w-7 sm:h-8 sm:w-8" />
    </a>
  );
}
