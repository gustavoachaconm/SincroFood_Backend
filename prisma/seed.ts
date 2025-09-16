import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Países
  await prisma.country.createMany({
    data: [
      {
        data: "Colombia",
        long_data: "República de Colombia",
        prefix: "+57",
      },
      {
        data: "Venezuela",
        long_data: "República Bolivariana de Venezuela",
        prefix: "+58",
      },
    ],
    skipDuplicates: true,
  });

  // Tipos de restaurantes
  await prisma.restaurant_type.createMany({
    data: [{ data: "Fast Food" }, { data: "Pizzería" }, { data: "Gourmet" }],
    skipDuplicates: true,
  });

  console.log("✅ Seed ejecutado correctamente");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
