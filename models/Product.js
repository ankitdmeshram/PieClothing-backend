const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    // default: mongoose.Types.ObjectId(),
  },
  name: {
    type: String,
    required: true,
  },
  category: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  size: [
    {
      type: String,
    },
  ],
  color: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  offerPrice: {
    type: String,
  },
  gallery: [
    {
      type: String,
    },
  ],
  seo_title: {
    type: String,
  },
  seo_description: {
    type: String,
  },
  seo_keywords: [
    {
      type: String,
    },
  ],
  created_date: {
    type: Date,
    default: Date.now,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
