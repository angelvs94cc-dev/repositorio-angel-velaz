"use client";

import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error("Error en el marketplace", error);
  }, [error]);

  return (
    <main className="mx-auto grid max-w-xl gap-5 px-6 py-16">
      <p className="text-sm text-gray-500">
        Error inesperado
      </p>

      <h1 className="text-3xl font-bold">
        No hemos podido cargar el marketplace
      </h1>

      <p>
        Puedes volver a intentarlo o regresar a la página principal.
      </p>

      <div className="flex gap-3">
        <button
          className="rounded bg-black px-4 py-2 text-white"
          onClick={reset}
          type="button"
        >
          Reintentar
        </button>

        <Link
          className="rounded border px-4 py-2"
          href="/"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}