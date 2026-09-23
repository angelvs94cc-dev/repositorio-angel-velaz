"use server";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteAd(adId: number) {
  const session = await getSession();

  if (!session) {
    throw new Error("Necesitas iniciar sesión.");
  }

  const ad = await prisma.ad.findUnique({
    where: { id: adId },
    select: { ownerId: true },
  });

  if (!ad) {
    throw new Error("El anuncio no existe.");
  }

  if (ad.ownerId !== session.userId) {
    throw new Error("No puedes modificar un anuncio que no es tuyo.");
  }

  await prisma.ad.delete({
    where: { id: adId },
  });

  revalidatePath("/");
  redirect("/");
}