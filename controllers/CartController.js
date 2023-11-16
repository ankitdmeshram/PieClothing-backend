const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");

exports.addToCart = async (req, res) => {
  try {
    const { pid, uid, tempUid, size, color, created_date, updated_date } =
      req.body;

    const cartOne = await Cart.find({ uid: uid });

    // console.log("cart = ", cartOne, cartOne[0]?.products, typeof cartOne);
    let CartDetails;
    if (cartOne.length > 0) {
      let flag = 0;
      const duCart = cartOne[0]?.products.filter((pro) => {
        if (pid == pro.pid) {
          pro.quantity = pro.quantity + 1;
          flag = 1;
        }
        return pro;
      });

      if (flag == 1) {
        CartDetails = await Cart.updateOne(
          { uid: uid },
          {
            $set: {
              products: duCart,
            },
          }
        );
        return res.status(200).json({
          success: true,
          message: "Added To Cart Successfully",
          CartDetails,
          cartOne,
        });
      }

      cartOne[0]?.products.push({
        pid: pid,
        size: size,
        color: color,
        quantity: 1,
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
            quantity: 1,
          },
        ],
        uid: uid,
        tempUid: tempUid,
      });
    }

    // console.log(CartDetails);
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
    let productList = [];

    if (cartOne.length == 0) {
      return res.status(200).json({
        success: true,
        message: "Cart found successfully",
        cart: cartOne,
        productList,
      });
    }

    console.log("cartone ===", cartOne);

    const products = await Product.find();
    console.log("products =", products);

    cartOne[0].products.map((c) => {
      products.map((p) => {
        if (String(c.pid) == String(p._id)) {
          let temp = {
            ...p._doc,
            quantity: c.quantity,
          };
          productList.push(temp);
        }
      });
    });

    return res.status(200).json({
      success: true,
      message: "Cart found successfully",
      cart: cartOne,
      productList,
    });
  } catch (err) {
    return res.status(504).json({
      success: false,
      message: `Something went wrong ${err}`,
    });
  }
};

exports.DeleteCartById = async (req, res) => {
  try {
    // console.log(req.body);
    const { uid, pid } = req.body;

    const cartOne = await Cart.find({ uid: uid });

    // console.log("cartone", cartOne);

    let proCart = cartOne[0]?.products.filter((product) => {
      // console.log(product);
      return product?.pid != pid;
    });

    // console.log(proCart);

    CartDetails = await Cart.updateOne(
      { uid: uid },
      {
        $set: {
          products: proCart,
        },
      }
    );

    return res.status(200).json({
      success: "true",
      message: "Product Removed Successfully",
      CartDetails,
      proCart,
    });
  } catch (err) {
    // console.log("Something went wrong", err);
    return res.status(504).json({
      success: false,
      messge: `Something went wrong ${err}`,
    });
  }
};

exports.viewCart = async (req, res) => {
  try {
    let cartDetails = await Cart.find();

    let cartU = cartDetails.filter((cart) => cart.products.length > 0);

    let user;
    console.log("lentgh", cartU.length);
    for (let i = 0; i < cartU.length; i++) {
      try {
        user = await User.findOne({ _id: cartU[i].uid });
        cartU[i] = {
          ...cartU[i]._doc,
          userDetails: user,
        };
      } catch (err) {
        console.log("no user");
      }
      console.log("cart u id", cartU[i].userDetails);
    }

    res.status(200).json({
      success: true,
      cartDetails: cartU,
      user,
    });
  } catch (err) {
    return res.status(504).json({
      success: false,
      message: `Something went wrong ${err}`,
    });
  }
};
