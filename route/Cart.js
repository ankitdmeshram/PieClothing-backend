const express = require("express");
const router = express.Router();
const {
  addToCart,
  viewCartById,
  DeleteCartById,
  viewCart,
} = require("../controllers/CartController");

router.post("/addtocart", addToCart);
router.post("/viewcart", viewCartById);
router.post("/deletecart", DeleteCartById);
router.post("/viewallcart", viewCart);

module.exports = router;
