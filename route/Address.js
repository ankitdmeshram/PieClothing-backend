const express = require("express");
const router = express.Router();
const {
    singleAddress,
    createAddress,
    updateAddress,
    deleteAddress,
} = require("../controllers/AddressController");

router.post("/createaddress", createAddress);
router.post("/singleaddress", singleAddress);
router.post("/updateaddress", updateAddress);
router.post("/deleteaddress", deleteAddress);

module.exports = router;
