import { getAdById } from "@/lib/projects";
import { parseAdId } from "@/lib/project-query";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const adId = parseAdId(id);

  if (adId === null) {
    notFound();
  }

  const ad = await getAdById(adId);

  if (!ad) {
    notFound();
  }

  return {
    title: `${ad.name} - ${ad.price.toFixed(2)} €`,
    description: ad.description,
  };
}

export default async function AdDetailPage({ params }: Props) {
  const { id } = await params;
  const adId = parseAdId(id);

  if (adId === null) {
    notFound();
  }

  const ad = await getAdById(adId);

  if (!ad) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-6 py-10">
      <Link href="/" className="underline">
        ← Volver
      </Link>

      <article className="rounded-xl border p-6">
        <h1 className="text-4xl font-bold">{ad.name}</h1>

        <p className="mt-4 text-gray-600">{ad.description}</p>

        <p className="mt-6 text-3xl font-bold">
          {ad.price.toFixed(2)} €
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {ad.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        <button className="mt-8 rounded bg-black px-5 py-3 text-white">
          Comprar / Reservar
        </button>
      </article>
    </main>
  );
}