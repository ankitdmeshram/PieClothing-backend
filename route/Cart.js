const express = require("express");
const router = express.Router();
const {
  addToCart,
  viewCartById,
  DeleteCartById,
} = require("../controllers/CartController");

router.post("/addtocart", addToCart);
router.post("/viewcart", viewCartById);
router.post("/deletecart", DeleteCartById);

module.exports = router;
