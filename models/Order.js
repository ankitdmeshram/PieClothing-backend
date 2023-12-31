const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    // default: mongoose.Types.ObjectId(),
  },
  orderId: {
    type: String,
  },
  amountPaid: {
    type: String,
  },
  amountRemaining: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  deliveryAdd: {
    type: {},
  },
  status: {
    type: String,
  },
  cartId: {
    type: String,
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

module.exports = mongoose.model("Order", orderSchema);
