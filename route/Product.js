const express = require("express");
const router = express.Router();
const {
  createProduct,
  allProducts,
  updateProduct,
  singleProduct,
  deleteProduct,
  imgUpload,
  productImg,
} = require("../controllers/ProductController");

router.post("/createproduct", createProduct);
router.post("/allproducts", allProducts);
router.post("/uploadimg", imgUpload, (req, res) => {
  try {
    console.log(res);
    const filenames = req.files.map((file) => file.filename);

    console.log("Image Uplaod");
    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      filename: filenames,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});
router.get("/images", productImg);
router.post("/singleproduct", singleProduct);
router.post("/updateproducts", updateProduct);
router.post("/deleteproduct", deleteProduct);

module.exports = router;
