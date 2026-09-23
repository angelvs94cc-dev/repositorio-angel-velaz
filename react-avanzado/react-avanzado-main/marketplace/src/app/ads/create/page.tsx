import Link from "next/link";
import CreateAdForm from "./create-ad-form";

export default function CreateAdPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-8 px-6 py-10">
      <Link href="/" className="underline">
        ← Volver al marketplace
      </Link>

      <div>
        <h1 className="text-3xl font-bold">
          Crear anuncio
        </h1>

        <p className="mt-2 text-gray-500">
          Publica un artículo en el marketplace.
        </p>
      </div>

      <CreateAdForm />
    </main>
  );
}