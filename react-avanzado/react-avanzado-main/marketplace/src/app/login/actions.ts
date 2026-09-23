"use server";

import { createSession, destroySession } from "@/lib/auth";
import { DEMO_USERS, isDemoUserKey } from "@/lib/demo-users";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

function safeReturnPath(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "/";

  if (/^\/ads\/create(?:[/?#]|$)/.test(value)) {
    return value;
  }

  return "/";
}

export async function startDemoSession(formData: FormData): Promise<void> {
  const demoUser = formData.get("demoUser");

  if (!isDemoUserKey(demoUser)) {
    throw new Error("Usuario demo desconocido");
  }

  const user = await prisma.user.findUnique({
    where: { email: DEMO_USERS[demoUser].email },
    select: { id: true },
  });

  if (!user) {
    throw new Error("Ejecuta npm run db:seed antes de iniciar sesión");
  }

  await createSession(user.id);

  redirect(safeReturnPath(formData.get("from")));
}

export async function endDemoSession(): Promise<void> {
  await destroySession();
  redirect("/");
}