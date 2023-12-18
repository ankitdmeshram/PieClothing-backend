const express = require("express");
const router = express.Router();
const { createOrder, orderData } = require("../controllers/OrderController");

router.post("/create", createOrder);
router.post("/orderdata", orderData);

module.exports = router;
