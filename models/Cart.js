const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: {
    type: String,
    // default: mongoose.Types.ObjectId(),
  },
  products: [],
  uid: {
    type: String,
  },
  tempUid: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
