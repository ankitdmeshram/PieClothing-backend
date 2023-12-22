const Razorpay = require("razorpay");

const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET_KEY);
require("dotenv").config();

const Order = require("../models/Order");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

const razorpay = new Razorpay({
  key_id: "rzp_test_MqoMJgNy2RIv4g",
  key_secret: "O2hsaJEDx5bE8xugDLMdGEtz",
});

exports.allOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: Number(amount), // amount in paise (e.g., 50000 paise = INR 500)
      currency: currency,
      receipt: "order_receipt_1",
      payment_capture: 1, // Auto capture the payment
    };

    const response = await razorpay.orders.create(options);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//order kelela data takat aho..
exports.orderData = async (req, res) => {
  try {
    const {
      order_id,
      amountPaid,
      amountRemaining,
      name,
      email,
      phone,
      deliveryAdd,
      cartList,
      cartId,
      uid,
      status,
    } = req.body;

    if (!cartId && !uid) {
      res.status(500).json({
        success: false,
        message: "Cart Id and User Id are required fields",
      });
    }

    const order = await Order.create({
      cartId,
      uid,
      order_id,
      amountPaid,
      amountRemaining,
      name,
      email,
      phone,
      deliveryAdd,
      cartList,
      status,
    });

    res.status(200).json({
      success: true,
      order,
      message: "Order created successfully",
    });
  } catch (err) {
    console.log("Something went wrong!");
  }
};

exports.orderDataById = async (req, res) => {
  try {
    const { _id } = req.body;
    const orders = await Order.find({ _id: _id });
    res.status(200).json({
      success: true,
      order: orders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const {
      _id,
      order_id,
      amountPaid,
      amountRemaining,
      name,
      email,
      phone,
      deliveryAdd,
      cartList,
      cartId,
      uid,
      status,
    } = req.body;

    if (!_id && !cartId && !uid) {
      res.status(500).json({
        success: false,
        message: "Cart Id and User Id are required fields",
      });
    }

    const response = await Order.findByIdAndUpdate({
      _id,
      order_id,
      amountPaid,
      amountRemaining,
      name,
      email,
      phone,
      deliveryAdd,
      cartList,
      cartId,
      uid,
      status,
    });

    res.status(200).json({
      success: true,
      message: "order updated successfully!",
      order: response,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.body;
    const order = await Order.find({ _id: id });

    if (order?.length == 0) {
      return res.status(200).json({
        success: false,
        message: "Order Not Found",
      });
    }

    const response = await Order.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Order Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
