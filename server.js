const express = require("express");
const productsRouter = require("./routes/products.routes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ pesan: "API daftar produk aktif" });
});

app.use("/products", productsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Terjadi kesalahan pada server" });
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
