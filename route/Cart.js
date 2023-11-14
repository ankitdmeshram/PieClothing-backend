const express = require("express");
const router = express.Router();
const { addToCart } = require("../controllers/CartController");

router.post("/addtocart", addToCart);

module.exports = router;
