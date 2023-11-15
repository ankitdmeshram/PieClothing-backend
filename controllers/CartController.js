const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { pid, uid, tempUid, size, color, created_date, updated_date } =
      req.body;

    const cartOne = await Cart.find({ uid: uid });

    console.log("cart = ", cartOne, cartOne[0]?.products, typeof cartOne);
    let CartDetails;
    if (cartOne.length > 0) {
      cartOne[0]?.products.push({
        pid: pid,
        size: size,
        color: color,
      });

      CartDetails = await Cart.updateOne(
        { uid: uid },
        {
          $set: {
            products: cartOne[0]?.products,
          },
        }
      );
    } else {
      CartDetails = await Cart.create({
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
    }

    console.log(CartDetails);
    return res.status(200).json({
      success: true,
      message: "Added To Cart Successfully",
      CartDetails,
      cartOne,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.viewCartById = async (req, res) => {
  try {
    const { uid } = req.body;
    const cartOne = await Cart.find({ uid: uid });
    console.log("cart", cartOne);
    return res.status(200).json({
      success: true,
      message: "Cart found successfully",
      cartOne,
    });
  } catch (err) {
    return res.status(504).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
