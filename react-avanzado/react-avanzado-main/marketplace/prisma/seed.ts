import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL no está definida");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.ad.deleteMany();
  await prisma.user.deleteMany();

  const ana = await prisma.user.create({
    data: {
      email: "ana@example.test",
      displayName: "Ana",
    },
  });

  const pepe = await prisma.user.create({
    data: {
      email: "pepe@example.test",
      displayName: "Pepe",
    },
  });

  await prisma.ad.createMany({
    data: [
      {
        name: "iPhone 15 Pro",
        description: "iPhone en perfecto estado con caja original.",
        price: 750,
        tags: ["tecnologia", "movil", "apple"],
        ownerId: ana.id,
      },
      {
        name: "Cámara Panasonic GH5",
        description: "Cámara mirrorless ideal para fotografía y vídeo.",
        price: 680,
        tags: ["fotografia", "video", "camara"],
        ownerId: ana.id,
      },
      {
        name: "Guitarra española",
        description: "Guitarra española en muy buen estado y poco uso.",
        price: 140,
        tags: ["musica", "guitarra"],
        ownerId: pepe.id,
      },
      {
        name: "MacBook Air",
        description: "Portátil ligero y funcionando perfectamente.",
        price: 620,
        tags: ["tecnologia", "portatil", "apple"],
        ownerId: pepe.id,
      },
      {
        name: "Pioneer DDJ-FLX4",
        description: "Controladora DJ con muy poco uso y caja original.",
        price: 260,
        tags: ["musica", "dj", "pioneer"],
        ownerId: ana.id,
      },
      {
        name: "Bicicleta urbana",
        description: "Bicicleta cómoda para desplazamientos por ciudad.",
        price: 180,
        tags: ["deporte", "bicicleta"],
        ownerId: pepe.id,
      },
    ],
  });

  console.log("Base de datos inicializada con Ana, Pepe y 6 anuncios.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });