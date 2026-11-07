const { PrismaClient } = require("@prisma/client");
const products = require("../data/products");

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  const data = products.map(({ name, price }) => ({ name, price }));
  const hasil = await prisma.product.createMany({ data });

  console.log(`Seed selesai, ${hasil.count} produk dimasukkan`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
