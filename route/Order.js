const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/OrderController");

router.post("/create", createOrder);

module.exports = router;
