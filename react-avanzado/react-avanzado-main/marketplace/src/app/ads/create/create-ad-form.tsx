"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  createAd,
  type AdActionState,
} from "./actions";

const initialState: AdActionState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="rounded bg-black px-5 py-3 text-white disabled:opacity-50"
      disabled={pending}
      type="submit"
    >
      {pending ? "Creando anuncio..." : "Crear anuncio"}
    </button>
  );
}

export default function CreateAdForm() {
  const [state, formAction] = useActionState(
    createAd,
    initialState,
  );

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-2">
        <label htmlFor="name">Nombre</label>

        <input
          className="rounded border p-3"
          id="name"
          name="name"
          placeholder="Ej: iPhone 15 Pro"
        />

        {state.fieldErrors.name && (
          <p className="text-sm text-red-500">
            {state.fieldErrors.name.join(", ")}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="description">Descripción</label>

        <textarea
          className="rounded border p-3"
          id="description"
          name="description"
          placeholder="Describe el artículo"
          rows={5}
        />

        {state.fieldErrors.description && (
          <p className="text-sm text-red-500">
            {state.fieldErrors.description.join(", ")}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="price">Precio (€)</label>

        <input
          className="rounded border p-3"
          id="price"
          min="0"
          name="price"
          placeholder="100"
          step="0.01"
          type="number"
        />

        {state.fieldErrors.price && (
          <p className="text-sm text-red-500">
            {state.fieldErrors.price.join(", ")}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="tags">Tags</label>

        <input
          className="rounded border p-3"
          id="tags"
          name="tags"
          placeholder="tecnologia, movil, apple"
        />

        <p className="text-sm text-gray-500">
          Separa los tags mediante comas.
        </p>

        {state.fieldErrors.tags && (
          <p className="text-sm text-red-500">
            {state.fieldErrors.tags.join(", ")}
          </p>
        )}
      </div>

      <SubmitButton />

      {state.message && (
        <p
          className={
            state.status === "error"
              ? "text-red-500"
              : "text-green-600"
          }
        >
          {state.message}
        </p>
      )}
    </form>
  );
}