import prisma from "./prisma";
import { AdDto } from "./projects.types";
import { AD_PAGE_SIZE, AdQuery } from "./project-query";
import { Prisma } from "@/generated/prisma/client";

export async function getAdIds(): Promise<number[]> {
  const ads = await prisma.ad.findMany({
    select: { id: true },
  });

  return ads.map((ad) => ad.id);
}

export type AdResult = {
  ads: AdDto[];
  totalPages: number;
  total: number;
};

export async function getAdsByFilter({
  query,
  order,
  page,
  minPrice,
  maxPrice,
  tag,
}: AdQuery): Promise<AdResult> {
  if (page < 1) {
    throw new Error("El parámetro 'page' no puede ser cero o negativo");
  }

  const where: Prisma.AdWhereInput = {
    AND: [
      query
        ? {
            OR: [
              {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},
      minPrice !== undefined
        ? { price: { gte: minPrice } }
        : {},
      maxPrice !== undefined
        ? { price: { lte: maxPrice } }
        : {},
      tag
        ? {
            tags: {
              has: tag,
            },
          }
        : {},
    ],
  };

  const total = await prisma.ad.count({ where });
  const totalPages = Math.ceil(total / AD_PAGE_SIZE);

  if (page > totalPages && totalPages > 0) {
    return {
      ads: [],
      total,
      totalPages,
    };
  }

  const ads = await prisma.ad.findMany({
    where,
    orderBy: { createdAt: order },
    skip: (page - 1) * AD_PAGE_SIZE,
    take: AD_PAGE_SIZE,
  });

  return {
    ads,
    totalPages,
    total,
  };
}

export async function getAdById(
  id: number,
): Promise<AdDto | null> {
  return prisma.ad.findUnique({
    where: { id },
  });
}