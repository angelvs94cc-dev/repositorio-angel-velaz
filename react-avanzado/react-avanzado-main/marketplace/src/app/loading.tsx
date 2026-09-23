export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl font-bold">Marketplace</h1>

      <p className="mt-2 text-gray-500">
        Cargando anuncios...
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <article
            className="animate-pulse rounded-xl border p-5"
            key={index}
          >
            <div className="h-6 w-2/3 rounded bg-gray-200" />
            <div className="mt-4 h-4 w-full rounded bg-gray-200" />
            <div className="mt-2 h-4 w-4/5 rounded bg-gray-200" />
            <div className="mt-5 h-8 w-1/3 rounded bg-gray-200" />
          </article>
        ))}
      </div>
    </main>
  );
}