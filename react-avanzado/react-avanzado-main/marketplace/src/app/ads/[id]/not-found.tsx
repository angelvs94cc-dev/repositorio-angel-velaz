import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-4xl font-bold">Anuncio no encontrado</h1>
      <p className="mt-3 text-gray-500">
        El anuncio que buscas no existe o ha sido eliminado.
      </p>

      <Link className="mt-6 inline-block underline" href="/">
        Volver al marketplace
      </Link>
    </main>
  );
}