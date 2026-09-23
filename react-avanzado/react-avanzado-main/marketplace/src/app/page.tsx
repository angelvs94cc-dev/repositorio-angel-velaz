import Link from "next/link";
import { getAdsByFilter } from "@/lib/projects";
import {
  adListHref,
  parseAdQuery,
  SearchParamValue,
} from "@/lib/project-query";

type HomePageProps = {
  searchParams: Promise<Record<string, SearchParamValue>>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const queryParams = await searchParams;
  const input = parseAdQuery(queryParams);
  const { ads, totalPages } = await getAdsByFilter(input);

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold">Marketplace</h1>
          <p className="text-gray-500">
            Compra y vende artículos de segunda mano.
          </p>
        </div>

        <div className="flex gap-3">
          <Link className="rounded border px-4 py-2" href="/login">
            Login
          </Link>
          <Link
            className="rounded bg-black px-4 py-2 text-white"
            href="/ads/create"
          >
            Crear anuncio
          </Link>
        </div>
      </header>

      <form
        action="/"
        method="GET"
        className="grid gap-3 rounded-lg border p-4 md:grid-cols-5"
      >
        <input
          className="rounded border p-2"
          defaultValue={input.query}
          name="query"
          placeholder="Buscar anuncio"
        />

        <input
          className="rounded border p-2"
          defaultValue={input.minPrice}
          min="0"
          name="minPrice"
          placeholder="Precio mínimo"
          step="0.01"
          type="number"
        />

        <input
          className="rounded border p-2"
          defaultValue={input.maxPrice}
          min="0"
          name="maxPrice"
          placeholder="Precio máximo"
          step="0.01"
          type="number"
        />

        <input
          className="rounded border p-2"
          defaultValue={input.tag}
          name="tag"
          placeholder="Tag"
        />

        <button className="rounded bg-black p-2 text-white" type="submit">
          Buscar
        </button>

        <Link className="text-sm underline" href="/">
          Limpiar filtros
        </Link>
      </form>

      {ads.length === 0 ? (
        <p>No hay anuncios que coincidan con los filtros.</p>
      ) : (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ads.map((ad) => (
            <article key={ad.id} className="rounded-xl border p-5">
              <h2 className="text-xl font-bold">
                <Link href={`/ads/${ad.id}`}>{ad.name}</Link>
              </h2>

              <p className="mt-2 text-gray-600">{ad.description}</p>

              <p className="mt-4 text-2xl font-bold">
                {ad.price.toFixed(2)} €
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {ad.tags.map((tag) => (
                  <span
                    className="rounded-full bg-gray-100 px-2 py-1 text-xs"
                    key={tag}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>
      )}

      <nav className="flex items-center gap-4">
        {input.page > 1 ? (
          <Link href={adListHref(input, input.page - 1)}>Anterior</Link>
        ) : (
          <span className="text-gray-400">Anterior</span>
        )}

        <span>
          Página {input.page} de {Math.max(totalPages, 1)}
        </span>

        {input.page < totalPages ? (
          <Link href={adListHref(input, input.page + 1)}>Siguiente</Link>
        ) : (
          <span className="text-gray-400">Siguiente</span>
        )}
      </nav>
    </main>
  );
}