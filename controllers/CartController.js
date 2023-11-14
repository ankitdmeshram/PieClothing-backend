const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { pid, uid, tempUid, size, color, created_date, updated_date } =
      req.body;

    const CartDetails = await Cart.create({
      products: [
        {
          pid: pid,
          size: size,
          color: color,
        },
      ],
      uid: uid,
      tempUid: tempUid,
    });
    console.log(CartDetails);
    return res.status(200).json({
      success: true,
      message: "Added To Cart Successfully",
      CartDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};
