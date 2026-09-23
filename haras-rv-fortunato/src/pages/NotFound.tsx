import { Button } from "../components/Button";
import { useSeo } from "../hooks/useSeo";

export default function NotFound() {
  useSeo({ titulo: "Página não encontrada" });
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="font-serif text-8xl font-semibold text-couro-500">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-musgo-900">Essa trilha não existe</h1>
      <p className="mt-3 text-tinta/75">A página que você procurou não foi encontrada.</p>
      <Button to="/" className="mt-8">Voltar ao início</Button>
    </section>
  );
}
