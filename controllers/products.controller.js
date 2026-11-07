const prisma = require("../lib/prisma");

function validasiProduk(body) {
  const { name, price } = body;

  if (typeof name !== "string" || name.trim() === "") {
    return { pesan: "Field name wajib diisi dan berupa teks" };
  }

  if (!Number.isInteger(price) || price < 0) {
    return { pesan: "Field price wajib berupa bilangan bulat tidak negatif" };
  }

  return { data: { name: name.trim(), price: price } };
}

function ambilId(req) {
  const id = Number(req.params.id);
  return Number.isInteger(id) ? id : null;
}

async function getAllProducts(req, res) {
  const products = await prisma.product.findMany({
    orderBy: { id: "asc" },
  });

  res.status(200).json(products);
}

async function getProductById(req, res) {
  const id = ambilId(req);

  if (id === null) {
    return res.status(400).json({ message: "ID harus berupa angka" });
  }

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }

  res.status(200).json(product);
}

async function createProduct(req, res) {
  const hasil = validasiProduk(req.body ?? {});

  if (hasil.pesan) {
    return res.status(400).json({ message: hasil.pesan });
  }

  const product = await prisma.product.create({ data: hasil.data });

  res.status(201).json(product);
}

async function updateProduct(req, res) {
  const id = ambilId(req);

  if (id === null) {
    return res.status(400).json({ message: "ID harus berupa angka" });
  }

  const hasil = validasiProduk(req.body ?? {});

  if (hasil.pesan) {
    return res.status(400).json({ message: hasil.pesan });
  }

  const lama = await prisma.product.findUnique({ where: { id } });

  if (!lama) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }

  const product = await prisma.product.update({
    where: { id },
    data: hasil.data,
  });

  res.status(200).json(product);
}

async function deleteProduct(req, res) {
  const id = ambilId(req);

  if (id === null) {
    return res.status(400).json({ message: "ID harus berupa angka" });
  }

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }

  await prisma.product.delete({ where: { id } });

  res.status(200).json({
    message: "Produk berhasil dihapus",
    data: product,
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
