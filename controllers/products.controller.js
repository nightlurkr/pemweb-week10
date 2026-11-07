const products = require("../data/products");

function getAllProducts(req, res) {
  res.status(200).json(products);
}

function getProductById(req, res) {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }

  res.status(200).json(product);
}

function createProduct(req, res) {
  const { name, price } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ message: "Field name wajib diisi" });
  }

  if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
    return res.status(400).json({ message: "Field price wajib berupa angka positif" });
  }

  const idBaru = products.length === 0 ? 1 : Math.max(...products.map((p) => p.id)) + 1;
  const product = { id: idBaru, name: name.trim(), price: price };

  products.push(product);
  res.status(201).json(product);
}

module.exports = { getAllProducts, getProductById, createProduct };
