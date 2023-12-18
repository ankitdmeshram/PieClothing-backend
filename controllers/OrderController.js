const Razorpay = require("razorpay");

const Order = require("../models/Order");

const razorpay = new Razorpay({
  key_id: "rzp_test_MqoMJgNy2RIv4g",
  key_secret: "O2hsaJEDx5bE8xugDLMdGEtz",
});

exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: 50000, // amount in paise (e.g., 50000 paise = INR 500)
      currency: "INR",
      receipt: "order_receipt_1",
      payment_capture: 1, // Auto capture the payment
    };

    try {
      const response = await razorpay.orders.create(options);
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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
    } = req.body;

    if (!cartId && !uid) {
      res.status(500).json({
        success: false,
        message: "Cart Id and User Id are required fields",
      });
    }

    const order = await Order.create({ cartId, uid });

    res.status(200).json({
      success: true,
      order,
      message: "Order created successfully",
    });
  } catch (err) {
    console.log("Something went wrong!");
  }
};
