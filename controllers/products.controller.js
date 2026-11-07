const prisma = require("../lib/prisma");

async function getAllProducts(req, res) {
  const products = await prisma.product.findMany({
    orderBy: { id: "asc" },
  });

  res.status(200).json(products);
}

async function getProductById(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "ID harus berupa angka" });
  }

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }

  res.status(200).json(product);
}

module.exports = { getAllProducts, getProductById };
