const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`); // Set a unique filename for each uploaded file
  },
});

// Create multer instance with the storage configuration
const upload = multer({ storage: storage });
const Product = require("../models/Product");

exports.allProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      washcare,
      type,
      size,
      color,
      price,
      offerPrice,
      gallery,
      seo_title,
      seo_description,
      seo_keywords,
      created_date,
      updated_date,
    } = req.body;
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Name and Price fields are required",
      });
    }
    const ProductDetails = await Product.create({
      name: name,
      category: category,
      description: description,
      washcare: washcare,
      size: size,
      type: type,
      color: color,
      price: price,
      offerPrice: offerPrice,
      gallery: gallery,
      seo_title: seo_title,
      seo_description: seo_description,
      seo_keywords: seo_keywords,
      created_date: created_date,
      updated_date: updated_date,
    });
    // console.log(ProductDetails);
    return res.status(200).json({
      success: true,
      message: "Product Added Successfully",
      ProductDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      _id,
      name,
      category,
      type,
      description,
      washcare,
      size,
      color,
      price,
      offerPrice,
      gallery,
      seo_title,
      seo_description,
      seo_keywords,
      created_date,
      updated_date,
    } = req.body;

    const body = {
      _id,
      name,
      category,
      description,
      washcare,
      size,
      type,
      color,
      price,
      offerPrice,
      gallery,
      seo_title,
      seo_description,
      seo_keywords,
      created_date,
      updated_date,
    };

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Name and Price fields are required",
      });
    }
    // console.log("Product Id", _id);
    const product = await Product.findByIdAndUpdate(_id, body);
    // console.log(product, "product");
    return res.status(200).json({
      success: true,
      message: "Product Found Successfully",
      body,
    });
  } catch (error) {
    // console.log("error", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.singleProduct = async (req, res) => {
  try {
    const _id = req.body._id;
    const product = await Product.findById(_id);
    // console.log(product, "product");
    return res.status(200).json({
      success: true,
      message: "Product Found Successfully",
      product,
    });
  } catch (e) {}
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.body._id;
    // console.log(id);
    const product = await Product.findById({ _id: id });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    await Product.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: "Product Cannot be deleted successfully",
    });
  }
};

exports.imgUpload = upload.array("images", 50);

exports.productImg = (req, res) => {
  // console.log(req.body.img);
  const img = req.body.img;

  res.send(`
      <img src="/uploads/1700709880791.jpeg">
  `);
};
