import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.country.createMany({
    data: [
      { data: "Colombia", long_data: "República de Colombia", prefix: "+57" },
      {
        data: "Venezuela",
        long_data: "República Bolivariana de Venezuela",
        prefix: "+58",
      },
    ],
    skipDuplicates: true,
  });
  await prisma.restaurant_type.createMany({
    data: [{ data: "Fast Food" }, { data: "Pizzería" }, { data: "Gourmet" }],
    skipDuplicates: true,
  });
}
main().finally(() => prisma.$disconnect());
