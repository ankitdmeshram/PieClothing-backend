const express = require("express");
const router = express.Router();
const { addToCart, viewCartById } = require("../controllers/CartController");

router.post("/addtocart", addToCart);
router.post("/viewcart", viewCartById);

module.exports = router;
