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
      size: size,
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
      success: true,
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
      description,
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
