"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { adSchema } from "./ad-schema";

export type AdActionState = {
  status: "idle" | "error" | "success";
  message: string;
  fieldErrors: {
    name?: string[];
    description?: string[];
    price?: string[];
    tags?: string[];
  };
};

export async function createAd(
  _previousState: AdActionState,
  formData: FormData,
): Promise<AdActionState> {
  const session = await getSession();

  if (!session) {
    return {
      status: "error",
      message: "Necesitas iniciar sesión para crear un anuncio.",
      fieldErrors: {},
    };
  }

  const parsed = adSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    tags: formData.get("tags"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Revisa los campos indicados.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  await prisma.ad.create({
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      price: parsed.data.price,
      tags: parsed.data.tags,
      ownerId: session.userId,
    },
  });

  revalidatePath("/");

  redirect("/");
}