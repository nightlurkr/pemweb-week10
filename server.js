const express = require("express");
const productsRouter = require("./routes/products.routes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ pesan: "API daftar produk aktif" });
});

app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
