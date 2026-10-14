import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="eyebrow mb-4">Errore 404</p>
      <h1 className="font-serif text-5xl md:text-6xl">Pagina non trovata</h1>
      <p className="mt-6 text-sm text-ink/60">Il capo o la pagina che cerchi non è più disponibile.</p>
      <Link href="/collezione" className="btn-primary mt-10">
        Torna alla collezione
      </Link>
    </section>
  );
}
