const express = require("express");
const {
  getAllProducts,
  getProductById,
} = require("../controllers/products.controller");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);

module.exports = router;
