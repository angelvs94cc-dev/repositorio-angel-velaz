import { z } from "zod";

export const adSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .max(80, "El nombre no puede superar 80 caracteres."),

  description: z
    .string()
    .trim()
    .min(10, "La descripción debe tener al menos 10 caracteres.")
    .max(500, "La descripción no puede superar 500 caracteres."),

  price: z.coerce
    .number()
    .positive("El precio debe ser mayor que 0."),

  tags: z
    .string()
    .trim()
    .min(1, "Introduce al menos un tag.")
    .transform((value) =>
      value
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
    ),
});