import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth", () => ({
  getSession: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  default: {
    ad: {
      create: vi.fn(),
    },
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAd, type AdActionState } from "../actions";

const initialState: AdActionState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

describe("createAd Server Action", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getSession).mockResolvedValue({
      userId: 1,
    });
  });

  it("devuelve errores cuando los datos no son válidos", async () => {
    const formData = new FormData();
    formData.set("name", "");
    formData.set("description", "corta");
    formData.set("price", "-10");
    formData.set("tags", "");

    const result = await createAd(initialState, formData);

    expect(result.status).toBe("error");
    expect(result.message).toBe("Revisa los campos indicados.");
    expect(result.fieldErrors.name).toBeDefined();
    expect(prisma.ad.create).not.toHaveBeenCalled();
  });

  it("crea un anuncio válido y revalida el marketplace", async () => {
    const formData = new FormData();
    formData.set("name", "iPhone 15");
    formData.set("description", "Teléfono en perfecto estado.");
    formData.set("price", "500");
    formData.set("tags", "tecnologia, movil");

    await createAd(initialState, formData);

    expect(prisma.ad.create).toHaveBeenCalledWith({
      data: {
        name: "iPhone 15",
        description: "Teléfono en perfecto estado.",
        price: 500,
        tags: ["tecnologia", "movil"],
        ownerId: 1,
      },
    });

    expect(revalidatePath).toHaveBeenCalledWith("/");
    expect(redirect).toHaveBeenCalledWith("/");
  });
});